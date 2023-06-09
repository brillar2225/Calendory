import React from 'react';

export default function EventList({ events }) {
  return (
    <>
      {events.length >= 1 && (
        <h1 className='inline-block p-2 mt-2 bg-slate-50 rounded-md text-xl font-semibold text-primary-black'>
          今日のスケジュール
        </h1>
      )}
      <ul className='shadow-xl rounded-xl bg-slate-50 overflow-y-auto'>
        {events.map((events, idx) => (
          <li
            key={idx}
            className='flex items-center px-3 py-2 border-b border-gray-200'
          >
            <div className='basis-full'>
              <h2 className='w-fit text-lg font-bold'>{events.title}</h2>
              <h3 className='w-fit text-sm'>{events.desc}</h3>
            </div>
            <div
              className={`basis-24 h-7 shadow-lg rounded-full text-center font-semibold
              ${events.priority === '1' && 'bg-rose-300'}
              ${events.priority === '2' && 'bg-rose-300'}
              ${events.priority === '3' && 'bg-green-300'}
              ${events.priority === '4' && 'bg-amber-300'}
              ${events.priority === '5' && 'bg-amber-300'}`}
            >
              {events.priority === '1' && 'Highest'}
              {events.priority === '2' && 'High'}
              {events.priority === '3' && 'Middle'}
              {events.priority === '4' && 'Low'}
              {events.priority === '5' && 'Lowest'}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
