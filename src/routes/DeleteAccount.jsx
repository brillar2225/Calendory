import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import DeleteCaution from '../pages/DeleteCaution';
import useUser from '../hooks/useUser';

const initialValue = {
  password: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const { user } = useOutletContext();
  const { isLoading, error, deleteAccount } = useUser();
  const [values, setValues] = useState(initialValue);
  const [caution, setCaution] = useState(false);

  const providerId = user.providerData[0].providerId;
  const provider =
    providerId !== 'password'
      ? providerId.charAt(0).toUpperCase() +
        providerId.slice(1, providerId.length).replace('.com', '')
      : providerId;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaution = () => {
    setCaution((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaution(false);
    setValues(initialValue);
    deleteAccount(provider, values);
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
          <h2 className='text-xl font-bold'>アカウントを削除しますか？</h2>
          {provider === 'password' ? (
            <>
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
            </>
          ) : (
            <>
              <h3 className='mt-5 text-sm'>
                この手順では{provider}でご利用中の{user.displayName}
                様のアカウントを削除します。
              </h3>
              <h5 className='mt-5 text-sm'>
                この手順を完了すると、{user.displayName}様の{provider}
                アカウントとの連携が解除されると同時にアカウントが削除されます。
              </h5>
              <h5 className='mt-5 text-sm'>
                ご希望の方は、以下の
                <sapn className='text-button-red'>Delete</sapn>
                ボタンを押下して下さい。
              </h5>
            </>
          )}
          {error && <h3 className='text-xs text-rose-700 pt-2'>{error}</h3>}
          <div className='flex flex-col items-center w-full mt-6'>
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
                onClick={handleCaution}
              >
                Delete
              </button>
            </div>
          </div>
          {caution && (
            <DeleteCaution
              user={user}
              onClick={handleCaution}
              onSubmit={handleSubmit}
            />
          )}
        </form>
      )}
    </>
  );
}
