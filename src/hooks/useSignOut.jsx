import { signOut } from 'firebase/auth';
import { auth } from '../api/firebase';
import { useAuthContext } from '../contexts/AuthContext';

export default function useSignOut() {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'REMOVE_USER', payload: null });
  };

  return { logout };
}
