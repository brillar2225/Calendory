import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../useAuthContext';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  auth,
  db,
  githubProvider,
  googleProvider,
  twitterProvider,
} from '../../api/firebase';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';

export default function useSignInOut() {
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
    login(values);
  };

  // メールアドレスとパスワードでのログイン
  const login = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      const { email, password } = values;
      if (email === '' || password === '') {
        setError('メールアドレスまたはパスワードをご入力下さい。');
        setIsLoading(false);
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: 'SET_USER', payload: userCredential.user });
      setIsLoading(false);
      return navigate('/');
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
          setError('ログインに失敗しました。');
      }
      setIsLoading(false);
    }
  };

  // Googleログイン
  const googleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした。');
        setIsLoading(false);
        return navigate('/login');
      }
      const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (docSnap.exists()) {
        setIsLoading(false);
        return navigate('/');
      }
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        createdAt: Timestamp.fromDate(new Date()),
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoUrl: userCredential.user.photoURL,
        providerId:
          userCredential.providerId.charAt(0).toUpperCase() +
          userCredential.providerId
            .slice(1, userCredential.providerId.length)
            .replace('.com', ''),
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
        case 'auth/account-exists-with-different-credential':
          setError('メールアドレスがすでに登録されています。');
          break;
        case 'auth/popup-blocked':
          setError('ポップアップブロックを解除して再度お試し下さい。');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('Googleログインに失敗しました。');
      }
      setIsLoading(false);
    }
  };

  // Twitterログイン
  const twitterLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userCredential = await signInWithPopup(auth, twitterProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした。');
        setIsLoading(false);
        return navigate('/login');
      }
      const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (docSnap.exists()) {
        setIsLoading(false);
        return navigate('/');
      }
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        createdAt: Timestamp.fromDate(new Date()),
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoUrl: userCredential.user.photoURL,
        providerId:
          userCredential.providerId.charAt(0).toUpperCase() +
          userCredential.providerId
            .slice(1, userCredential.providerId.length)
            .replace('.com', ''),
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
        case 'auth/account-exists-with-different-credential':
          setError('メールアドレスがすでに登録されています。');
          break;
        case 'auth/popup-blocked':
          setError('ポップアップブロックを解除して再度お試し下さい。');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('Twitterログインに失敗しました。');
      }
      setIsLoading(false);
    }
  };

  // Githubログイン
  const githubLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userCredential = await signInWithPopup(auth, githubProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした。');
        setIsLoading(false);
        return navigate('/login');
      }
      const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (docSnap.exists()) {
        setIsLoading(false);
        return navigate('/');
      }
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        createdAt: Timestamp.fromDate(new Date()),
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoUrl: userCredential.user.photoURL,
        providerId:
          userCredential.providerId.charAt(0).toUpperCase() +
          userCredential.providerId
            .slice(1, userCredential.providerId.length)
            .replace('.com', ''),
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
        case 'auth/account-exists-with-different-credential':
          setError('メールアドレスがすでに登録されています。');
          break;
        case 'auth/popup-blocked':
          setError('ポップアップブロックを解除して再度お試し下さい。');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('Githubログインに失敗しました。');
      }
      setIsLoading(false);
    }
  };

  // ログアウト
  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'REMOVE_USER', payload: null });
    return navigate('/');
  };

  return {
    values,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    googleLogin,
    twitterLogin,
    githubLogin,
    logout,
  };
}

const initialValues = {
  email: '',
  password: '',
};
