import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import calendory from '../assets/logos/Calendory.png';
import { useAuthContext } from '../contexts/AuthContext';

export default function Header() {
  const {
    state: { user },
  } = useAuthContext();

  return (
    <header className='px-1 md:px-2 lg:px-3 shadow-sm'>
      <div className='relative flex h-15 items-center justify-between md:h-16 lg:h-17'>
        <Link to={user ? `/${user.uid}` : '/'}>
          <img
            src={calendory}
            alt='Calendory'
            className='h-12 w-32 md:h-13 md:w-34.5 lg:h-14 lg:w-37.5'
          />
        </Link>
        <Navbar user={user} />
      </div>
    </header>
  );
}
