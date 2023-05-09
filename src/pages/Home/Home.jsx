import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Welcome from './Welcome';
import UserHome from './UserHome';

export default function Home() {
  const { user } = useAuthContext();

  return <>{user ? <UserHome user={user} /> : <Welcome />}</>;
}
