import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';
import { useAuthContext } from '../contexts/AuthContext';

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

  return { isLoading, error, login };
}
