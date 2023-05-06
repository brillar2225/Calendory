import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/User/useUser';
import { useAuthContext } from '../../hooks/useAuthContext';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import InputForm from '../../components/form/InputForm';
import Button from '../../components/ui/Button';
import useToggle from '../../hooks/useToggle';

export default function Mypage() {
  const { user } = useAuthContext();
  const initialValue = {
    displayName: user.displayName,
    email: user.email,
    password: '',
  };
  const [values, setValues] = useState(initialValue);
  const { toggle, handleToggle } = useToggle();
  const { isLoading, error, updateUser } = useUser();

  const provider = user.providerData[0].providerId;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, password: initialValue.password });
    updateUser(initialValue, values);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm
          srTitle={`${user.displayName}の会員情報`}
          title={`${user.displayName}の会員情報`}
          error={error}
        >
          <AuthForm onSubmit={handleSubmit}>
            <img
              className='rounded-full h-48 w-48 mt-2'
              src={user.photoUrl ? user.photoUrl : user.photoURL}
              alt={user.displayName}
            />
            <div className='flex flex-col items-center w-full mt-5'>
              <input
                type='text'
                className={`${toggle && 'text-lg'} input`}
                name='displayName'
                value={values.displayName}
                onChange={handleChange}
                disabled={toggle}
                required
              />
              <input
                type='email'
                className={`${toggle && 'text-lg'} input`}
                name='email'
                value={values.email}
                onChange={handleChange}
                disabled={toggle || provider !== 'password'}
                required
              />
              {!toggle && provider === 'password' && (
                <InputForm
                  type={'password'}
                  placeholder={'Enter password'}
                  name={'password'}
                  value={values.password}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className='w-full mt-4'>
              <div className='flex justify-center w-full'>
                {toggle ? (
                  <Button
                    color={'sub-blue'}
                    type={'button'}
                    title={'Edit'}
                    onClick={handleToggle}
                  />
                ) : (
                  <div className='inline-flex space-x-2 w-9/10'>
                    <Button
                      color={'sub-blue'}
                      type={'button'}
                      title={'Cancel'}
                      onClick={handleToggle}
                    />
                    <Button color={'blue'} type={'submit'} title={'Submit'} />
                  </div>
                )}
              </div>
            </div>
            <div className='mt-4'>
              {provider === 'password' ? (
                <>
                  <Link
                    to={'password'}
                    className='h-10 underline lg:no-underline lg:hover:underline text-sm'
                  >
                    パスワード変更
                  </Link>
                  <span> / </span>
                  <Link
                    to={'delete'}
                    className='h-10 underline lg:no-underline lg:hover:underline text-sm'
                  >
                    アカウント削除
                  </Link>
                </>
              ) : (
                <Link
                  to={'delete'}
                  className='h-10 underline lg:no-underline lg:hover:underline text-sm'
                >
                  アカウント削除
                </Link>
              )}
            </div>
          </AuthForm>
        </SectionForm>
      )}
    </>
  );
}
