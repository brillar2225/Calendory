import React from 'react';

export default function DefalutPage() {
  return (
    <article className='relative flex justify-center items-center w-full h-full'>
      <h1 className='sr-only'>ようこそ、Calendoryへ</h1>
      <div className='absolute top-60 '>
        <h2 className='text-lg text-slate-400 text-center lg:hidden'>
          上のタップをクリックして下さい
        </h2>
        <h2 className='hidden lg:block lg:text-5xl lg:text-slate-400 lg:text-center'>
          左のタップをクリックして下さい
        </h2>
      </div>
    </article>
  );
}
