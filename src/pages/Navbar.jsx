import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <nav>
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
      <div className='m-2 cursor-pointer lg:hidden' onClick={handleToggle}>
        {toggle ? (
          <FontAwesomeIcon
            icon={faBars}
            size='xl'
            className='text-primary-black'
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            bounce
            size='xl'
            className='text-primary-black'
          />
        )}
      </div>
    </nav>
  );
}
