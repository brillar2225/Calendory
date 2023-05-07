import React from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/Auth/useSignUp';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import InputForm from '../../components/form/InputForm';
import Button from '../../components/ui/Button';

export default function Join() {
  const { isLoading, error, values, handleChange, handleSubmit } = useSignUp();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm srTitle={'会員登録画面'} title={'会員登録'} error={error}>
          <AuthForm onSubmit={handleSubmit}>
            <InputForm
              type={'displayName'}
              name={'displayName'}
              placeholder={'Enter username'}
              value={values.displayName}
              onChange={handleChange}
            />
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
            <InputForm
              type={'password'}
              name={'confirmPassword'}
              placeholder={'Confirm password'}
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <Button color={'blue'} type={'submit'} title={'Sign Up'} />
          </AuthForm>
          <div className='flex flex-col items-center mt-4'>
            <h3 className='text-sm mb-3'>すでにアカウントをお持ちの方</h3>
            <Link
              to={'/login'}
              className='flex items-center justify-center h-11 w-9/10 rounded-lg border border-button-blue text-button-blue'
            >
              Sign In
            </Link>
          </div>
        </SectionForm>
      )}
    </>
  );
}
