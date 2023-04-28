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
        setError('パスワードを入力して下さい');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('パスワードが一致しておりません');
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
        setError(e.message);
      }
    } catch (e) {
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
        setError('メールアドレスまたはパスワードを入力して下さい');
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
      setError('ログインが出来ませんでした');
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
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
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
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
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
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  // ユーザー情報をアップデート
  const updateUser = async (initialValue, values) => {
    const { displayName: prevDisplayName, email: prevEmail } = initialValue;
    const { displayName, email, password } = values;
    console.log(prevDisplayName, displayName);
    console.log(prevEmail, email);
    console.log(prevDisplayName !== displayName, prevEmail !== email);
    try {
      setError(null);
      setIsLoading(true);
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
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            updateEmail(auth.currentUser, email)
              .then(() => {
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                    console.log('Succeeded in updating email');
                  })
                  .catch((e) => {
                    console.log(e.message);
                    setError('Failure to send email verification');
                    setIsLoading(false);
                  });
              })
              .catch((e) => {
                console.log(e.message);
                setError('Failure to update email');
                setIsLoading(false);
              });
          })
          .catch((e) => {
            console.log(e.message);
            setError('Failure to re-authenticate with credential');
            setIsLoading(false);
          });
      }
      try {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          displayName,
          email,
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
        setError('ユーザー情報を保存することが出来ませんでした');
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setError('ユーザー情報をアップデートできませんでした');
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
        setError('メールアドレスまたはパスワードを入力して下さい');
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
        setError('ユーザー名またはメールアドレスを正しく入力して下さい');
        setIsLoading(false);
        return navigate('/reset-password');
      }
      try {
        await sendPasswordResetEmail(auth, email);
        console.log('Succeeded in sending password reset email');
      } catch {
        setError('最初から再度やり直して下さい');
        setIsLoading(false);
        return navigate('/reset-password');
      } finally {
        setIsLoading(false);
        return navigate('/login');
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
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
  };
}
