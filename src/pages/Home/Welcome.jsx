import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <section className='h-9/10 bg-slate-50'>
      <h1 className='sr-only'>Welcome to CALENDORY</h1>
      <div className='relative h-full overflow-hidden'>
        <div className='welcome welcome-1 sm-welcome-1 md:md-welcome-1 lg:lg-welcome-1 2xl:xxl-welcome-1'></div>
        <div className='welcome welcome-2 sm-welcome-2 md:md-welcome-2 lg:lg-welcome-2 2xl:xxl-welcome-2'></div>
        <div className='flex flex-col max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full m-auto'>
          <div className='flex flex-col items-center m-auto w-9/10 font-bold z-20'>
            <h1 className='flex flex-col items-center'>
              <span className='mt-2 text-4xl sm:text-5xl lg:text-6xl md:mt-3 lg:mt-4'>
                さあ
              </span>
              <span className='mt-2 text-3xl sm:text-4xl lg:text-5xl md:mt-3 lg:mt-4'>
                まとめて管理しよう
              </span>
            </h1>
            <h2 className='flex flex-col mt-3 md:mt-5 lg:mt-7 text-2xl sm:text-3xl lg:text-4xl'>
              あなたの日程やタスク
            </h2>
          </div>
          <div className='flex flex-col justify-center items-center max-w-xs w-full m-auto z-20 lg:flex-row sm:max-w-sm lg:max-w-md lg:space-x-2'>
            <button className='btn btn-blue'>
              <Link
                to={'/login'}
                className='flex justify-center items-center w-full h-full px-5 py-2 lg:text-lg'
              >
                ログインから始める
              </Link>
            </button>
            <button className='btn btn-sub-blue'>
              <Link
                to={'/join'}
                className='flex justify-center items-center w-full h-full px-5 py-2 lg:text-lg'
              >
                会員登録から始める
              </Link>
            </button>
          </div>
        </div>
        <div className='welcome welcome-3 sm-welcome-3 md:md-welcome-3 lg:lg-welcome-3 2xl:xxl-welcome-3'></div>
        <div className='welcome welcome-4 sm-welcome-4 md:md-welcome-4 lg:lg-welcome-4 2xl:xxl-welcome-4'></div>
      </div>
    </section>
  );
}
