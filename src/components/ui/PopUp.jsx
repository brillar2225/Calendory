import React from 'react';

export default function PopUp({ status, message }) {
  switch (status) {
    case 'SUCCESS':
      return (
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-[110%] flex justify-center items-center w-72 h-11 rounded-full shadow-md text-base font-semibold z-30 select-none animate-popUp bg-emerald-200 text-emerald-800'>
          {message}
        </div>
      );
    case 'ERROR':
      return (
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-[110%] flex justify-center items-center w-72 h-11 rounded-full shadow-md text-base font-semibold z-30 select-none animate-popUp bg-rose-200 text-rose-800'>
          {message}
        </div>
      );
    default:
      return null;
  }
}
