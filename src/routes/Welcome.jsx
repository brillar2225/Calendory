import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <section className='h-9/10 w-full'>
      <h1 className='sr-only'>Welcome to Calendory!</h1>
      <div>
        <h1>Welcome to Calendory</h1>
        <Link to={'/login'}>Sign In</Link>
      </div>
    </section>
  );
}
