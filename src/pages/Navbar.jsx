import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import useUser from '../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useUser();
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <nav className='inline-flex items-center z-50'>
      {user ? (
        <ul
          className={`${
            toggle ? 'hidden' : 'fixed right-1 top-14 bg-secondary-blue'
          } lg:flex lg:static lg:flex-row lg:space-x-2 lg:bg-transparent rounded-lg`}
        >
          <li>
            <Link
              to={'/'}
              className='flex justify-center items-center px-4 py-2 h-14 w-24  text-white lg:w-26 lg:text-primary-black lg:hover:rounded-lg lg:hover:border lg:hover:border-primary-black'
              onClick={logout}
            >
              Sign Out
            </Link>
          </li>
          <li className='hidden lg:flex lg:items-center lg:justify-center'>
            <Link to={`${user.uid}`}>
              <img
                src={user.photoUrl ? user.photoUrl : user.photoURL}
                alt={user.displayName}
                className='rounded-full h-12 w-12'
              />
            </Link>
          </li>
        </ul>
      ) : (
        <ul
          className={`${
            toggle ? 'hidden' : 'fixed right-1 top-11 bg-secondary-blue'
          } lg:flex lg:static lg:flex-row lg:space-x-2 lg:bg-transparent rounded-lg`}
        >
          <li>
            <Link
              to={'login'}
              className='flex justify-center items-center px-4 py-2 h-14 w-24  text-white lg:w-26 lg:text-primary-black lg:hover:rounded-lg lg:hover:border lg:hover:border-primary-black'
              onClick={handleToggle}
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to={'join'}
              className='flex justify-center items-center px-4 py-2 h-14 w-24 text-white lg:w-26 lg:text-primary-black lg:hover:rounded-lg lg:hover:border lg:hover:border-primary-black'
              onClick={handleToggle}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      )}
      {user && (
        <Link to={`/${user.uid}`} className='mr-2 lg:hidden'>
          <img
            src={user.photoUrl ? user.photoUrl : user.photoURL}
            alt={user.displayName}
            className='h-11 w-11 rounded-full '
          />
        </Link>
      )}
      <div className='cursor-pointer lg:hidden' onClick={handleToggle}>
        {toggle ? (
          <FontAwesomeIcon
            icon={faBars}
            className='h-6 w-6 p-2 text-primary-black'
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            bounce
            className='h-6 w-6 p-2 text-primary-black'
          />
        )}
      </div>
    </nav>
  );
}
