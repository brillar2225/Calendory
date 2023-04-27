import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

export default function Mypage() {
  const { user } = useAuthContext();
  const [values, setValues] = useState({
    displayName: user.displayName,
    email: user.email,
  });
  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <section className='h-9/10'>
      <h1 className='sr-only'>My Page</h1>
      <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
        <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
          <form
            className='flex flex-col items-center space-y-6'
            onSubmit={handleSubmit}
          >
            <img
              className='rounded-full h-60 w-60'
              src={user.photoUrl ? user.photoUrl : user.photoURL}
              alt={user.displayName}
            />
            <input
              type='text'
              className={`${
                edit
                  ? 'border-none shadow-none bg-transparent'
                  : 'border shadow-sm'
              } text-xl w-full h-11 rounded-lg px-3 py-2`}
              name='displayName'
              value={values.displayName}
              onChange={handleChange}
              disabled={edit}
              required
            />
            <input
              type='email'
              className={`${
                edit
                  ? 'border-none shadow-none bg-transparent'
                  : 'border shadow-sm'
              } text-xl w-full h-11 rounded-lg px-3 py-2`}
              name='email'
              value={values.email}
              onChange={handleChange}
              disabled={edit}
              required
            />
            {edit ? (
              <button
                type='button'
                onClick={handleEdit}
                className='h-11 w-full rounded-lg border border-button-blue text-button-blue'
              >
                Edit
              </button>
            ) : (
              <button
                type='submit'
                className='h-11 w-full rounded-lg border-none bg-button-blue text-white'
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
