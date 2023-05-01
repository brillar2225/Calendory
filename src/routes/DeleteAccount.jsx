import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const initialValue = {
  password: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const { user } = useOutletContext();
  const { isLoading, error, deleteAccount } = useUser();
  const [values, setValues] = useState(initialValue);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setShow((show) => !show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    setValues(initialValue);
    deleteAccount(values);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          className='flex flex-col justify-center items-center p-6 rounded-lg shadow-lg bg-white relative'
          onSubmit={handleSubmit}
        >
          <h2 className='text-xl'>アカウント削除</h2>
          <input
            type='password'
            className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2 mt-4'
            name='password'
            placeholder='Enter password'
            value={values.password}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2 mt-4'
            name='confirmPassword'
            placeholder='Confirm password'
            value={values.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <h3 className='text-xs text-rose-700 pt-2'>{error}</h3>}
          <div className='flex flex-col items-center w-full mt-4'>
            <div className='inline-flex justify-between w-full'>
              <Link
                to={`/${user.uid}`}
                className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue flex items-center justify-center'
              >
                Go Back
              </Link>
              <button
                type='button'
                className='h-11 w-[45%] rounded-lg border-none bg-button-red text-white'
                onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>
          {show && (
            <div className='flex flex-col justify-center items-center p-6 absolute rounded-lg shadow-lg bg-white'>
              <FontAwesomeIcon
                icon={faXmark}
                className='h-6 w-6 p-2 absolute top-px right-px'
                onClick={handleClick}
              />
              <h2 className='text-2xl font-bold'>注意</h2>
              <h4 className='text-base md:text-lg mt-6'>
                アカウントを削除すると二度と{user.displayName}
                様に関するアカウント情報を復元することは出来ません。
              </h4>
              <h3 className='text-base md"text-lg text-button-red mt-6'>
                本当にアカウントを削除しますか？
              </h3>
              <div className='text-base md:text-lg mt-6'>
                <input
                  type='checkbox'
                  name='checked'
                  id='checked'
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className='mr-2'
                />
                <label htmlFor='checked'>承知致しました。</label>
              </div>
              <button
                disabled={!isChecked}
                type='submit'
                className='h-11 w-1/2 mt-6 text-lg disabled:bg-slate-400 rounded-lg border-none bg-button-red text-white'
                onClick={handleSubmit}
              >
                Delete Account
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
