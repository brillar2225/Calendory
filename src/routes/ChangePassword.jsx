import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useUser from '../hooks/useUser';

const initialValue = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const { user } = useOutletContext();
  const { isLoading, error, changePassword } = useUser();
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
    changePassword(values);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          className='flex flex-col justify-center items-center p-6 rounded-lg shadow-lg bg-white'
          onSubmit={handleSubmit}
        >
          <h2 className='text-xl font-bold'>パスワード変更</h2>
          {error && <h3 className='text-xs text-rose-700 pt-3'>{error}</h3>}
          <input
            type='password'
            className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2 mt-3'
            name='password'
            placeholder='Enter password'
            value={values.password}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2 mt-4'
            name='newPassword'
            placeholder='Enter new password'
            value={values.newPassword}
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
          <div className='flex flex-col items-center w-full mt-4'>
            <div className='inline-flex justify-between w-full'>
              <Link
                to={`/${user.uid}`}
                className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue flex items-center justify-center'
              >
                Previous
              </Link>
              <button
                type='submit'
                className='h-11 w-[45%] rounded-lg border-none bg-button-blue text-white'
              >
                Change
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
