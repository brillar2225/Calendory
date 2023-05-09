import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Welcome from './Welcome';

export default function Home() {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <section className='h-9/10 bg-slate-50'>
          <h1 className='sr-only'>Welcome to Calendory!</h1>
          <div>
            <Link to={`${user.uid}`}>マイカレンダー</Link>
          </div>
        </section>
      ) : (
        <Welcome />
      )}
    </>
  );
}
