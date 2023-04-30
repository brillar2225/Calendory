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
        <form
          className='flex flex-col items-center p-6 relative rounded-lg shadow-lg bg-white'
          onSubmit={handleSubmit}
        >
          <h2 className='text-xl'>{user.displayName}のマイページ</h2>
          <img
            className='rounded-full h-52 w-52 mt-4'
            src={user.photoUrl ? user.photoUrl : user.photoURL}
            alt={user.displayName}
          />
          {edit && (
            <label
              className='text-xs absolute top-[290px] left-9'
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
            } text-lg w-full h-11 rounded-lg px-3 py-2 mt-4`}
            name='displayName'
            id='displayName'
            value={values.displayName}
            onChange={handleChange}
            disabled={edit}
            required
          />
          {edit && (
            <label
              className='text-xs absolute top-[348px] left-9'
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
            } text-lg w-full h-11 rounded-lg px-3 py-2 mt-4`}
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
              } text-lg w-full h-11 rounded-lg px-3 py-2 mt-4`}
              placeholder='Enter password to edit'
              name='password'
              id='password'
              value={values.password}
              onChange={handleChange}
              required
            />
          )}
          {error && <h3 className='text-xs text-rose-700 pt-2'>{error}</h3>}
          {edit ? (
            <button
              type='button'
              onClick={handleEdit}
              className='h-11 w-full rounded-lg border border-button-blue text-button-blue mt-4'
            >
              Edit
            </button>
          ) : (
            <div className='flex flex-col items-center space-y-3 w-full mt-5'>
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
              <div>
                <Link
                  to={`${user.uid}/password/change`}
                  className='h-10 underline lg:no-underline lg:hover:underline text-sm'
                >
                  パスワード変更
                </Link>
                <span> / </span>
                <Link
                  to={`${user.uid}/delete`}
                  className='h-10 underline lg:no-underline lg:hover:underline text-sm'
                >
                  アカウント削除
                </Link>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
}
