import React from 'react';
import { Link } from 'react-router-dom';
import useSignInOut from '../../hooks/Auth/useSignInOut';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import InputForm from '../../components/form/InputForm';
import Button from '../../components/ui/Button';
import google from '../../assets/icons/google.png';
import twitter from '../../assets/icons/twitter.png';
import github from '../../assets/icons/github.png';

export default function Login() {
  const {
    isLoading,
    error,
    values,
    handleChange,
    handleSubmit,
    googleLogin,
    twitterLogin,
    githubLogin,
  } = useSignInOut();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm srTitle={'ログイン画面'} title={'ログイン'} error={error}>
          <AuthForm onSubmit={handleSubmit}>
            <InputForm
              type={'email'}
              name={'email'}
              placeholder={'Enter email'}
              value={values.email}
              onChange={handleChange}
            />
            <InputForm
              type={'password'}
              name={'password'}
              placeholder={'Enter password'}
              value={values.password}
              onChange={handleChange}
            />
            <Button color={'blue'} type={'submit'} title={'Sign In'} />
            <Link
              to={'/reset-password'}
              className='mt-3 underline lg:no-underline lg:hover:underline'
            >
              Forgot Password?
            </Link>
          </AuthForm>
          <div className='inline-flex justify-center items-center w-full mt-3 mb-1'>
            <span className='h-px w-5/12 bg-black'></span>
            <span>OR</span>
            <span className='h-px w-5/12 bg-black'></span>
          </div>
          <div className='flex flex-col items-center w-full space-y-2'>
            <Button color={'social'} type={'button'} onClick={googleLogin}>
              <div>
                Sign In with <span className='text-google-blue'>G</span>
                <span className='text-google-red'>o</span>
                <span className='text-google-yellow'>o</span>
                <span className='text-google-blue'>g</span>
                <span className='text-google-red'>l</span>
                <span className='text-google-yellow'>e</span>
              </div>
              <img src={google} alt='Google' className='h-6 w-6 ml-2' />
            </Button>
            <Button color={'social'} type={'button'} onClick={twitterLogin}>
              <div>
                Sign In with <span className='text-twitter'>Twitter</span>
              </div>
              <img src={twitter} alt='Twitter' className='h-6 w-6 ml-2' />
            </Button>
            <Button color={'social'} type={'button'} onClick={githubLogin}>
              <div>Sign In with Github</div>
              <img src={github} alt='Github' className='h-6 w-6 ml-2' />
            </Button>
          </div>
          <div className='flex flex-col items-center'>
            <h3 className='my-3 text-sm'>まだアカウントをお持ちでないの方</h3>
            <Link
              to={'/join'}
              className='flex justify-center items-center h-11 w-9/10 rounded-lg border border-button-blue text-button-blue'
            >
              Sign Up
            </Link>
          </div>
        </SectionForm>
      )}
    </>
  );
}
