import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../api/firebase';

export default function useChangePassword() {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
    changePassword(values);
  };

  // パスワード変更
  const changePassword = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { password, newPassword, confirmPassword } = values;
      if (password === '') {
        setError('パスワードをご入力下さい。');
        setIsLoading(false);
        return;
      }
      if (newPassword === '' || confirmPassword === '') {
        setError('新しいパスワードをご入力下さい。');
        setIsLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('パスワードが一致していません。');
        setIsLoading(false);
        return;
      }
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      setIsLoading(false);
      return navigate('/');
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/invalid-email':
          setError('メールアドレスの形式が正しくありません。');
          break;
        case 'auth/wrong-password' || 'permission-denied':
          setError('パスワードが間違っています。');
          break;
        case 'auth/user-mismatch':
          setError('メールアドレスまたはパスワードが間違っています。');
          break;
        default:
          setError('パスワードの変更が出来ませんでした。');
      }
      setIsLoading(false);
    }
  };

  return { values, isLoading, error, handleChange, handleSubmit };
}

const initialValue = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};
