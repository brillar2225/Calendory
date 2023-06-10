import React from 'react';
import DiaryItem from './DiaryItem';

export default function DiaryList({ diaries }) {
  return (
    <ul className='flex flex-col m-auto max-w-4xl w-full max-h-[87%] rounded-xl shadow-xl bg-slate-50 overflow-y-auto'>
      {diaries.length >= 1 &&
        diaries.map((diary) => <DiaryItem key={diary.id} diary={diary} />)}
    </ul>
  );
}
