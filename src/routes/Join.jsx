import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialValue = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Join() {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    setValues((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
  };

  return (
    <section className='h-9/10'>
      <h1 className='sr-only'>会員登録ページ</h1>
      <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
        <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
          <h1 className='text-2xl mt-3'>会員登録</h1>
          <form
            className='flex flex-col items-center space-y-3 py-6'
            onSubmit={handleSubmit}
          >
            <input
              className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
              type='text'
              name='displayName'
              value={values.displayName}
              placeholder='Enter username'
              onChange={handleChange}
              required
            />
            <input
              className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
              type='email'
              name='email'
              value={values.email}
              placeholder='Enter email'
              onChange={handleChange}
              required
            />
            <input
              className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
              type='password'
              name='password'
              value={values.password}
              placeholder='Enter password(at least 6 characters)'
              minLength={6}
              onChange={handleChange}
              required
            />
            <input
              className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
              type='password'
              name='confirmPassword'
              value={values.confirmPassword}
              placeholder='Confirm password'
              minLength={6}
              onChange={handleChange}
              required
            />
            <button
              type='submit'
              className='h-11 w-9/10 rounded-lg border-none bg-button-blue text-white'
            >
              Sign Up
            </button>
          </form>
          <div className='flex flex-col items-center'>
            <h3 className='text-sm mb-3'>すでにアカウントをお持ちの方</h3>
            <Link
              to={'/login'}
              className='flex items-center justify-center h-11 w-9/10 rounded-lg border border-button-blue text-button-blue'
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
