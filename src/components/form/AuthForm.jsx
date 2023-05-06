import React from 'react';

export default function AuthForm({ onSubmit, children }) {
  return (
    <form className='flex flex-col items-center' onSubmit={onSubmit}>
      {children}
    </form>
  );
}
