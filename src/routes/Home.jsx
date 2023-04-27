import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuthContext();

  return (
    <section className='h-9/10 w-full'>
      <h1 className='sr-only'>Welcome to Calendory!</h1>
      <div>
        <h1>Welcome to Calendory</h1>
        <Link to={user ? `${user.uid}` : '/login'}>
          {user ? 'Start' : 'Sign In'}
        </Link>
      </div>
    </section>
  );
}
