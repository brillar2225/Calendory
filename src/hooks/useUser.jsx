import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
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
  deleteDoc,
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

  // パスワードを変更
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

  // アカウント削除
  const deleteAccount = async (provider, values) => {
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
    deleteAccount,
  };
}
