import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function Mypage() {
  const { user } = useOutletContext();
  const initialValue = {
    displayName: user.displayName,
    email: user.email,
    password: '',
  };
  const [values, setValues] = useState(initialValue);
  const [edit, setEdit] = useState(true);
  const { isLoading, error, updateUser } = useUser();

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(initialValue, values);
    setValues(values);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          className='flex flex-col items-center space-y-4 relative'
          onSubmit={handleSubmit}
        >
          <h2 className='text-xl'>{user.displayName}のマイページ</h2>
          <img
            className='rounded-full h-60 w-60'
            src={user.photoUrl ? user.photoUrl : user.photoURL}
            alt={user.displayName}
          />
          {edit && (
            <label
              className='text-xs absolute top-[280px] left-3'
              htmlFor='displayName'
            >
              ユーザー名：
            </label>
          )}
          <input
            type='text'
            className={`${
              edit
                ? 'border-none shadow-none bg-transparent'
                : 'border shadow-sm'
            } text-lg w-full h-11 rounded-lg px-3 py-2`}
            name='displayName'
            id='displayName'
            value={values.displayName}
            onChange={handleChange}
            disabled={edit}
            required
          />
          {edit && (
            <label
              className='text-xs absolute top-[340px] left-3'
              htmlFor='email'
            >
              メールアドレス：
            </label>
          )}
          <input
            type='email'
            className={`${
              edit
                ? 'border-none shadow-none bg-transparent'
                : 'border shadow-sm'
            } text-lg w-full h-11 rounded-lg px-3 py-2`}
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            disabled={edit}
            required
          />
          {!edit && (
            <input
              type='password'
              className={`${
                edit
                  ? 'border-none shadow-none bg-transparent'
                  : 'border shadow-sm'
              } text-lg w-full h-11 rounded-lg px-3 py-2`}
              placeholder='Enter password to edit'
              name='password'
              id='password'
              value={values.password}
              onChange={handleChange}
              required
            />
          )}
          {error && <div>{error}</div>}
          {edit ? (
            <button
              type='button'
              onClick={handleEdit}
              className='h-11 w-full rounded-lg border border-button-blue text-button-blue'
            >
              Edit
            </button>
          ) : (
            <div className='flex flex-col items-center space-y-3 w-full'>
              <div className='inline-flex justify-between w-full'>
                <button
                  type='button'
                  onClick={handleEdit}
                  className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='h-11 w-[45%] rounded-lg border-none bg-button-blue text-white'
                >
                  Submit
                </button>
              </div>
              <Link
                to={`${user.uid}/change-password`}
                className='h-10 underline text-sm p-2 w-fit'
              >
                パスワード変更及びアカウント削除
              </Link>
            </div>
          )}
        </form>
      )}
    </>
  );
}
