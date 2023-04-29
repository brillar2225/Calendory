import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  githubProvider,
  googleProvider,
  twitterProvider,
} from '../api/firebase';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

export default function useUser() {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // メールアドレスとパスワードでの会員登録
  const register = async (values) => {
    try {
      setError(null);
      setIsLoading(true);
      const { displayName, email, password, confirmPassword } = values;
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
      try {
        setError(null);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          createdAt: Timestamp.fromDate(new Date()),
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: avatar,
        });
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setIsLoading(false);
        navigate('/');
      } catch (e) {
        console.log(e.code, e.message);
        setError(e.message);
      }
    } catch (e) {
      console.log(e.code, e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  // メールアドレスとパスワードでのログイン
  const login = async (values) => {
    try {
      setError(null);
      setIsLoading(true);
      const { email, password } = values;
      if (email === '' || password === '') {
        setError('メールアドレスまたはパスワードをご入力下さい');
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
      navigate('/');
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/user-not-found':
          setError('メールアドレスが正しいかご確認下さい');
          break;
        case 'auth/wrong-password':
          setError('パスワードが間違っています');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('ログインに失敗しました');
      }
      setIsLoading(false);
    }
  };

  // Googleログイン
  const googleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした');
        setIsLoading(false);
        return navigate('/login');
      }
      try {
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (docSnap.exists()) {
          dispatch({ type: 'SET_USER', payload: docSnap.data() });
          setIsLoading(false);
          return navigate(`/${userCredential.user.uid}`);
        }
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          createdAt: Timestamp.fromDate(new Date()),
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: userCredential.user.photoURL,
        });
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setIsLoading(false);
        navigate('/');
      } catch (e) {
        console.log(e.code, e.message);
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.code, e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  // Twitterログイン
  const twitterLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, twitterProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした');
        setIsLoading(false);
        return navigate('/login');
      }
      try {
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (docSnap.exists()) {
          dispatch({ type: 'SET_USER', payload: docSnap.data() });
          setIsLoading(false);
          return navigate(`/${userCredential.user.uid}`);
        }
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          createdAt: Timestamp.fromDate(new Date()),
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: userCredential.user.photoURL,
        });
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setIsLoading(false);
        navigate('/');
      } catch (e) {
        console.log(e.code, e.message);
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.code, e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  // Githubログイン
  const githubLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, githubProvider);
      if (!userCredential) {
        setError('ログインが出来ませんでした');
        setIsLoading(false);
        return navigate('/login');
      }
      try {
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (docSnap.exists()) {
          dispatch({ type: 'SET_USER', payload: docSnap.data() });
          setIsLoading(false);
          return navigate('/');
        }
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          createdAt: Timestamp.fromDate(new Date()),
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoUrl: userCredential.user.photoURL,
        });
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setIsLoading(false);
        navigate('/');
      } catch (e) {
        console.log(e.code, e.message);
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.code, e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  // ユーザー情報をアップデート
  const updateUser = async (initialValue, values) => {
    try {
      setError(null);
      setIsLoading(true);
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
        console.log('Succceed in updating email');
      }
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        email,
      });
      setIsLoading(false);
    } catch (e) {
      console.log(e.code, e.message);
      switch (e.code) {
        case 'auth/wrong-password':
          setError('パスワードが間違っています');
          break;
        case 'auth/too-many-requests':
          setError(
            'ログインに5回以上失敗しました。しばらく時間を置いてから再度お試し下さい。'
          );
          break;
        default:
          setError('ユーザー情報を変更できませんでした');
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

  // パスワードをリセット
  const resetPassword = async (values) => {
    try {
      setError(null);
      setIsLoading(true);
      const { displayName, email } = values;
      if (displayName === '' || email === '') {
        setError('メールアドレスまたはパスワードをご入力下さい');
        setIsLoading(false);
        return navigate('/reset-password');
      }
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('displayName', '==', displayName),
          where('email', '==', email)
        )
      );
      if (querySnapshot.empty !== false) {
        setError('ユーザー名またはメールアドレスを正しくご入力下さい');
        setIsLoading(false);
        return navigate('/reset-password');
      }
      try {
        await sendPasswordResetEmail(auth, email);
        console.log('Succeeded in sending password reset email');
      } catch (e) {
        console.log(e.code, e.message);
        setError('最初から再度やり直して下さい');
        setIsLoading(false);
        return navigate('/reset-password');
      } finally {
        setIsLoading(false);
        return navigate('/login');
      }
    } catch (e) {
      console.log(e.code, e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  // パスワードを変更
  const changePassword = async (values) => {
    try {
      setError(null);
      setIsLoading(true);
      const { password, newPassword, confirmPassword } = values;
      if (password === '') {
        setError('パスワードをご入力下さい');
        setIsLoading(false);
        return;
      }
      if (newPassword === '' || confirmPassword === '') {
        setError('新しいパスワードをご入力下さい');
        setIsLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('パスワードが一致していません');
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
        case 'auth/wrong-password':
          setError('パスワードが間違っています');
          break;
        case 'auth/user-mismatch':
          setError(e.code, e.message);
          break;
        default:
          setError('パスワードの変更が出来ませんでした');
      }
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    register,
    login,
    googleLogin,
    twitterLogin,
    githubLogin,
    updateUser,
    logout,
    resetPassword,
    changePassword,
  };
}
