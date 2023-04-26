import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import google from '../assets/icons/google.png';
import twitter from '../assets/icons/twitter.png';
import github from '../assets/icons/github.png';

const initialValue = {
  email: '',
  password: '',
};

export default function Login() {
  const [values, setValues] = useState(initialValue);
  const { isLoading, error, login, googleLogin, twitterLogin, githubLogin } =
    useUser();

  const handleChange = (e) => {
    setValues((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
    login(values);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className='h-9/10'>
          <h1 className='sr-only'>ログインページ</h1>
          <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
            <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
              <h1 className='text-2xl mt-3'>ログイン</h1>
              {error && <div>{error}</div>}
              <form
                className='flex flex-col items-center space-y-3 pt-6'
                onSubmit={handleSubmit}
              >
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
                  placeholder='Enter password'
                  onChange={handleChange}
                  required
                />
                <button
                  type='submit'
                  className='h-11 w-9/10 rounded-lg border-none bg-button-blue text-white'
                >
                  Sign In
                </button>
                <Link to={'/reset-password'}>Forgot Password?</Link>
              </form>
              <div className='inline-flex w-full items-center justify-center py-3'>
                <span className='h-px w-5/12 bg-black'></span>
                <span>OR</span>
                <span className='h-px w-5/12 bg-black'></span>
              </div>
              <div className='flex flex-col items-center w-full space-y-2'>
                <button
                  className='h-11 w-9/10 flex items-center justify-center space-x-2 rounded-lg border-none bg-gray-95'
                  onClick={googleLogin}
                >
                  <div>
                    Sign In with <span className='text-google-blue'>G</span>
                    <span className='text-google-red'>o</span>
                    <span className='text-google-yellow'>o</span>
                    <span className='text-google-blue'>g</span>
                    <span className='text-google-red'>l</span>
                    <span className='text-google-yellow'>e</span>
                  </div>
                  <img src={google} alt='Google' className='h-6 w-6' />
                </button>
                <button
                  className='h-11 w-9/10 flex items-center justify-center space-x-2 rounded-lg border-none bg-gray-95'
                  onClick={twitterLogin}
                >
                  <div>
                    Sign In with <span className='text-twitter'>Twitter</span>
                  </div>
                  <img src={twitter} alt='Twitter' className='h-6 w-6' />
                </button>
                <button
                  className='h-11 w-9/10 flex items-center justify-center space-x-2 rounded-lg border-none bg-gray-95'
                  onClick={githubLogin}
                >
                  <div>Sign In with Github</div>
                  <img src={github} alt='Github' className='h-6 w-6' />
                </button>
              </div>
              <div className='flex flex-col items-center mt-4'>
                <h3 className='text-sm mb-3'>
                  まだアカウントをお持ちでないの方
                </h3>
                <Link
                  to={'/join'}
                  className='flex items-center justify-center h-11 w-9/10 rounded-lg border border-button-blue text-button-blue'
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
