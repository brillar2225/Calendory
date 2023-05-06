import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {
  const { user } = useAuthContext();

  return (
    <section className='h-9/10 w-full'>
      <h1 className='sr-only'>Welcome to Calendory!</h1>
      <div>
        <h1>Welcome to Calendory</h1>
        {user ? (
          <Link to={`${user.uid}`}>カレンダーへ</Link>
        ) : (
          <Link to={'/login'}>はじめる</Link>
        )}
      </div>
    </section>
  );
}
