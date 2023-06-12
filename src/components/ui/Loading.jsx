import React from 'react';

export default function Loading() {
  return (
    <div
      className='flex justify-center items-center w-full h-9/10'
      aria-label='読み込み中'
    >
      <div className='animate-spin h-10 w-10 border-4 border-primary-blue rounded-full border-t-transparent'></div>
    </div>
  );
}
