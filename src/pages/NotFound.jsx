import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='flex flex-col max-w-xs w-full text-center sm:max-w-lg md:max-w-xl lg:max-w-3xl'>
        <h1 className='my-5 text-4xl font-bold md:my-7 md:text-5xl lg:text-6xl'>
          404 Not Found
        </h1>
        <h2 className='my-3 text-2xl font-medium md:my-5 md:text-3xl lg:text-4xl'>
          お探しのページは見つかりませんでした。
        </h2>
        <p className='my-3 text-lg md:my-5 md:text-xl'>
          あなたがお探しの当該ページは変更もしくは削除されているため、見つかることができませんでした。
        </p>
        <Link
          to={'/'}
          className='flex justify-center items-center m-auto mt-4 max-w-xs w-full h-11 border border-primary-blue rounded-lg text-primary-blue font-medium sm:max-w-sm'
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
