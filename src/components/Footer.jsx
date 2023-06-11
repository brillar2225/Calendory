import React from 'react';

export default function Footer() {
  return (
    <footer className='flex justify-center items-center border-t border-zinc-300 bg-stone-200 shadow-inner'>
      <div className='max-w-xs w-full sm:max-w-sm'>
        <h4 className='my-1 text-center'>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a href='https://github.com/brillar2225/' className='underline'>
            Jaehee Chung
          </a>{' '}
          Reserved.
        </h4>
        <div className='flex justify-between my-2 w-full border-t border-neutral-500'>
          <h5 className='basis-3/12 font-semibold text-left'>Contact</h5>
          <p className='basis-9/12 text-right'>brillar2225&#64;gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
