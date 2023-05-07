import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../api/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function useResetPassword() {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
    resetPassword(values);
  };

  // パスワードをリセット
  const resetPassword = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { displayName, email } = values;
      if (displayName === '' || email === '') {
        setError('メールアドレスまたはパスワードをご入力下さい。');
        setIsLoading(false);
      }
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('displayName', '==', displayName),
          where('email', '==', email)
        )
      );
      if (querySnapshot.empty !== false) {
        setError('ユーザー名またはメールアドレスを正しくご入力下さい。');
        setIsLoading(false);
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      return navigate('/login');
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/wrong-password':
          setError('パスワードが間違っています。');
          break;
        case 'permission-denied':
          setError('ユーザー名またはメールアドレスが間違っています。');
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
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
