import { Navigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const { uid } = useParams();

  if (!user || user.uid !== uid) {
    return <Navigate to={'/'} replace />;
  }
  return children;
}
