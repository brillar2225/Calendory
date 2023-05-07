import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import {
  auth,
  db,
  githubProvider,
  googleProvider,
  twitterProvider,
} from '../../api/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useAuthContext } from '../useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function useDeleteUser() {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caution, setCaution] = useState(false);

  const handleCaution = () => {
    const providerId = user.providerData[0].providerId;
    if (providerId === 'password') {
      if (values.password !== '' || values.confirmPassword !== '') {
        return setCaution((prev) => !prev);
      }
    }
    return setCaution((prev) => !prev);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaution(false);
    setValues(initialValues);
    removeUser(values);
  };

  // アカウント削除
  const removeUser = async (provider, values) => {
    try {
      setIsLoading(true);
      setError(null);
      if (provider === 'password') {
        const { password, confirmPassword } = values;
        if (password === '' || confirmPassword === '') {
          setError('パスワードをご入力下さい');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('パスワードが一致していません');
          setIsLoading(false);
          return;
        }
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      }
      if (provider === 'Google')
        await reauthenticateWithPopup(auth.currentUser, googleProvider);
      if (provider === 'Twitter')
        await reauthenticateWithPopup(auth.currentUser, twitterProvider);
      if (provider === 'Github')
        await reauthenticateWithPopup(auth.currentUser, githubProvider);
      await deleteDoc(doc(db, 'users', auth.currentUser.uid));
      await deleteUser(auth.currentUser);
      setIsLoading(false);
      return navigate('/');
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/wrong-password' || 'permission-denied':
          setError('パスワードが間違っています');
          break;
        case 'auth/popup-blocked':
          setError('ポップアップブロックを解除して再度お試し下さい。');
          break;
        default:
          setError('アカウント削除に失敗しました');
      }
      setIsLoading(false);
    }
  };

  return {
    user,
    values,
    isLoading,
    error,
    caution,
    handleCaution,
    handleChange,
    handleSubmit,
  };
}

const initialValues = {
  password: '',
  confirmPassword: '',
};
