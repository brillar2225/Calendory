import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../useAuthContext';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../api/firebase';

export default function useUser() {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ログアウト
  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'REMOVE_USER', payload: null });
    return navigate('/');
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

  // ユーザー情報をアップデート
  const updateUser = async (initialValue, values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { displayName: prevDisplayName, email: prevEmail } = initialValue;
      const { displayName, email, password } = values;
      if (prevDisplayName !== displayName) {
        await updateProfile(auth.currentUser, {
          displayName,
        });
      }
      if (prevEmail !== email) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, email);
        await sendEmailVerification(auth.currentUser);
      }
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        email,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/network-request-failed':
          setError('通信状況をご確認の上、再度お試し下さい。');
          break;
        case 'auth/user-not-found' || 'auth/user-mismatch':
          setError('メールアドレスまたはパスワードが間違っています。');
          break;
        case 'auth/wrong-password':
          setError('パスワードが間違っています。');
          break;
        case 'auth/invalid-email':
          setError('メールアドレスの形式が正しくありません。');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('ユーザー情報を変更できませんでした。');
      }
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    logout,
    resetPassword,
    updateUser,
  };
}
