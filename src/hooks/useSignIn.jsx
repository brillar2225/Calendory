import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {
  auth,
  db,
  githubProvider,
  googleProvider,
  twitterProvider,
} from '../api/firebase';
import { useAuthContext } from '../contexts/AuthContext';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';

export default function useSignIn() {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = async (values) => {
    try {
      setError(null);
      setIsLoading(true);
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: 'SET_USER', payload: userCredential.user });
      setIsLoading(false);
      navigate(`/${userCredential.user.uid}`);
    } catch (e) {
      setError('ログインが出来ませんでした');
      setIsLoading(false);
    }
  };

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
        console.log(docSnap.data());
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
        navigate(`/${userCredential.user.uid}`);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  return { isLoading, error, login, googleLogin, twitterLogin, githubLogin };
}
