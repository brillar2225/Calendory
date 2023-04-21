import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import calendory from '../assets/logos/Calendory.png';

export default function Header() {
  return (
    <header className='px-1 md:px-2 lg:px-3'>
      <div className='relative flex h-15 items-center justify-between md:h-16 lg:h-17'>
        <Link to={'/'}>
          <img
            src={calendory}
            alt='Calendory'
            className='h-12 w-32 md:h-13 md:w-34.5 lg:h-14 lg:w-37.5'
          />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
