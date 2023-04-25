import React from 'react';
// import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Mypage() {
  const {
    state: { user },
  } = useAuthContext();

  return <section>{user && <div>{user.displayName}</div>}</section>;
}
