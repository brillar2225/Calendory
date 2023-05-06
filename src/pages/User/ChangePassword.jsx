import React from 'react';
import { Link } from 'react-router-dom';
import useChangePassword from '../../hooks/User/useChangePassword';
import { useAuthContext } from '../../hooks/useAuthContext';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import InputForm from '../../components/form/InputForm';

export default function ChangePassword() {
  const { user } = useAuthContext();
  const { values, isLoading, error, handleChange, handleSubmit } =
    useChangePassword();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm
          srTitle={'パスワードを変更する'}
          title={'パスワード変更'}
          error={error}
        >
          <AuthForm onSubmit={handleSubmit}>
            <InputForm
              type={'password'}
              name={'password'}
              placeholder={'Enter password'}
              value={values.password}
              onChange={handleChange}
            />
            <InputForm
              type={'password'}
              name={'newPassword'}
              placeholder={'Enter new password'}
              value={values.newPassword}
              onChange={handleChange}
            />
            <InputForm
              type={'password'}
              name={'confirmPassword'}
              placeholder={'Confirm password'}
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </AuthForm>
          <div className='flex flex-col items-center w-full mt-4'>
            <div className='inline-flex justify-between w-9/10'>
              <Link
                to={`/${user.uid}/account`}
                className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue flex items-center justify-center'
              >
                Previous
              </Link>
              <button
                type='submit'
                className='h-11 w-[45%] rounded-lg border-none bg-button-blue text-white'
                onClick={handleSubmit}
              >
                Change
              </button>
            </div>
          </div>
        </SectionForm>
      )}
    </>
  );
}
