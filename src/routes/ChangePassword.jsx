import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

export default function ChangePassword() {
  const { user } = useOutletContext();
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form
      className='flex flex-col items-center space-y-6'
      onSubmit={handleSubmit}
    >
      <h2 className='text-xl'>パスワードの変更</h2>
      <input
        type='password'
        className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2'
        name='password'
        placeholder='Enter new password'
        value={values.password}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        className='border shadow-sm text-lg w-full h-11 rounded-lg px-3 py-2'
        name='confirmPassword'
        placeholder='Confirm password'
        value={values.confirmPassword}
        onChange={handleChange}
        required
      />
      <div className='flex flex-col items-center w-full'>
        <div className='inline-flex justify-between w-full'>
          <Link
            to={`/${user.uid}`}
            className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue flex items-center justify-center'
          >
            Go Back
          </Link>
          <button
            type='submit'
            className='h-11 w-[45%] rounded-lg border-none bg-button-blue text-white'
          >
            Change
          </button>
        </div>
        <button className='h-10 w-full mt-10 rounded-lg border text-sm border-button-red text-button-red hover:bg-button-red hover:border-none hover:text-white '>
          アカウントを削除する
        </button>
      </div>
    </form>
  );
}
