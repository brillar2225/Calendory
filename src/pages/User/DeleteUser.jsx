import React from 'react';
import { Link } from 'react-router-dom';
import useDeleteUser from '../../hooks/User/useDeleteUser';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import DeleteUserModal from './DeleteUserModal';

export default function DeleteUser() {
  const {
    user,
    values,
    isLoading,
    error,
    caution,
    handleCaution,
    handleChange,
    handleSubmit,
  } = useDeleteUser();
  const providerId = user.providerData[0].providerId;
  const provider =
    providerId !== 'password'
      ? providerId.charAt(0).toUpperCase() +
        providerId.slice(1, providerId.length).replace('.com', '')
      : providerId;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm
          srTitle={'アカウントを削除する'}
          title={'アカウント削除'}
          error={error}
        >
          <AuthForm onSubmit={() => handleSubmit(provider)}>
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
                  <span className='text-button-red'>Delete</span>
                  ボタンを押下して下さい。
                </h5>
              </>
            )}
            <div className='flex flex-col items-center w-full mt-6'>
              <div className='inline-flex justify-between w-full'>
                <Link
                  to={`/${user.uid}/account`}
                  className='h-11 w-[45%] rounded-lg border border-button-blue text-button-blue flex items-center justify-center'
                >
                  Cancel
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
          </AuthForm>
          {caution && (
            <DeleteUserModal
              user={user}
              onClick={handleCaution}
              onSubmit={handleSubmit}
            />
          )}
        </SectionForm>
      )}
    </>
  );
}
