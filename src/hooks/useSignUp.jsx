import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../api/firebase';
import { useAuthContext } from '../contexts/AuthContext';

export default function useSignUp() {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      await updateProfile(auth.currentUser, { displayName });
      try {
        setError(null);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          createdAt: Timestamp.fromDate(new Date()),
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        });
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setIsLoading(false);
        navigate(`/${userCredential.user.uid}`);
      } catch (e) {
        setError(e.message);
      }
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
}
