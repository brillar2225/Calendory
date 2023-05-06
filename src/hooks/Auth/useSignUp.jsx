import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../useAuthContext';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../api/firebase';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

export default function useSignUp() {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValues);
    register(values);
  };

  // メールアドレスとパスワードでの会員登録
  const register = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { displayName, email, password, confirmPassword } = values;
      if (password === '' || confirmPassword === '') {
        setError('パスワードをご入力下さい。');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('パスワードが一致していません。');
        setIsLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const avatar = createAvatar(identicon, {
        seed: ['Felix', 'Aneka'][Math.floor(Math.random() * 2)],
        rotate: [0, 90, 180, 270][Math.floor(Math.random() * 4)],
        size: 80,
        row4: ['ooxoo', 'oxoxo', 'oxxxo', 'xooox', 'xoxox', 'xxoxx', 'xxxxx'],
      }).toDataUriSync();
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: avatar,
      });
      await sendEmailVerification(auth.currentUser);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        createdAt: Timestamp.fromDate(new Date()),
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoUrl: avatar,
      });
      dispatch({ type: 'SET_USER', payload: userCredential.user });
      setIsLoading(false);
      return navigate('/');
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/email-already-in-use':
          setError('すでに登録済みのメールアドレスです。');
          break;
        case 'auth/weak-password':
          setError('パスワードは6文字以上ご入力下さい。');
          break;
        case 'auth/invalid-email':
          setError('メールアドレスの形式が正しくありません。');
          break;
        default:
          setError('会員登録に失敗しました。');
          break;
      }
      setIsLoading(false);
    }
  };

  return { values, isLoading, error, handleChange, handleSubmit };
}

const initialValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
