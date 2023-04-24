import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Home() {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <>
      {user && <div>{user.displayName}</div>}
      <Outlet />
    </>
  );
}
