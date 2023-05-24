import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserHome({ user }) {
  const [hour, setHour] = useState();

  useEffect(() => setHour(new Date().getHours()), []);

  return (
    <section className='h-9/10 bg-slate-50'>
      <h1 className='sr-only'>Welcome to Calendory!</h1>
      <div className='flex justify-center items-center h-full'>
        <div className='flex flex-col items-center justify-around max-w-xs w-full h-[450px] md:max-w-sm md:h-[500px]'>
          <div className='flex flex-col items-center'>
            <img
              className='rounded-full h-52 w-52 my-5'
              src={user.photoUrl ? user.photoUrl : user.photoURL}
              alt={user.displayName}
            />
            <h1 className='text-4xl font-bold md:text-5xl'>
              {user.displayName} 様
            </h1>
            {hour >= 5 && hour < 13 && (
              <SayHiMemo
                title={'おはようございます 🌞'}
                subTitle={'今日一日も頑張りましょう 💪'}
              />
            )}
            {hour >= 13 && hour < 19 && (
              <SayHiMemo
                title={'こんにちは 😊'}
                subTitle={'あと少しです！頑張って下さい 🔥'}
              />
            )}
            {(hour < 5 || hour >= 19) && (
              <SayHiMemo
                title={'こんばんは 🌙'}
                subTitle={'今日一日もお疲れ様でした 🙇‍♂️'}
              />
            )}
          </div>
          <button className='btn btn-blue'>
            <Link
              to={`${user.uid}`}
              className='flex justify-center items-center w-full h-full'
            >
              マイカレンダー
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

const SayHiMemo = memo(({ title, subTitle }) => {
  return (
    <h2 className='flex flex-col items-center space-y-3 mt-7'>
      <span className='text-xl'>{title}</span>
      <span className='text-xl'>{subTitle}</span>
    </h2>
  );
});
