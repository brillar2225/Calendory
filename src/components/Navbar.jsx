import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useSignInOut from '../hooks/Auth/useSignInOut';
import useToggle from '../hooks/useToggle';

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useSignInOut();
  const { menuToggle, hanldeMenuToggle } = useToggle();

  return (
    <nav className='relative flex items-center z-20'>
      {user ? (
        <>
          {menuToggle && (
            <ul className='absolute top-16 right-4 flex flex-col space-y-1 rounded-lg bg-primary-black text-white font-medium lg:right-3'>
              <li className='rounded-lg hover:bg-primary-orange hover:text-primary-black'>
                <Link
                  to={`${user.uid}/account`}
                  onClick={hanldeMenuToggle}
                  className='flex justify-center items-center px-2 py-3 w-24'
                >
                  Mypage
                </Link>
              </li>
              <li className='rounded-lg hover:bg-primary-orange hover:text-primary-black'>
                <Link
                  to={'/'}
                  onClick={() => {
                    hanldeMenuToggle();
                    logout();
                  }}
                  className='flex justify-center items-center px-2 py-3 w-24 '
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          )}
          <img
            src={user.photoUrl ? user.photoUrl : user.photoURL}
            alt={user.dispalyName}
            className='rounded-full h-12 w-12 m-2 cursor-pointer'
            onClick={hanldeMenuToggle}
          />
        </>
      ) : (
        <ul className='flex items-center font-semibold'>
          <li className='w-20 lg:h-13 rounded-lg hover:border hover:border-primary-black'>
            <Link
              to={'/login'}
              className='flex justify-center items-center px-2 py-3 w-full lg:h-full'
            >
              Sign In
            </Link>
          </li>
          <li className='w-20 lg:h-13 rounded-lg hover:border hover:border-primary-black'>
            <Link
              to={'/join'}
              className='flex justify-center items-center px-2 py-3 w-full lg:h-full'
            >
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
