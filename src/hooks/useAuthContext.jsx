import { useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  console.log(context);
  return useMemo(() => context, [context]);
};
