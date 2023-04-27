import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Account() {
  const { user } = useAuthContext();

  return (
    <section className='h-9/10'>
      <h1 className='sr-only'>My Page</h1>
      <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
        <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
          <Outlet context={{ user }} />
        </div>
      </div>
    </section>
  );
}
