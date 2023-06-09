import React from 'react';

export default function SubTaskItem({ list, idx }) {
  return (
    <li className='inline-flex justify-start items-center mt-1'>
      {idx + 1} {list}
      {/* 今後、checkbox機能も実装予定
      <input
        type='checkbox'
        name={list}
        id={list}
        className='w-3 h-3 bg-gray-50 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-50'
        checked={}
        onChange={handleChange}
      />
      <label htmlFor={list} className='pb-1 ml-2'>
        {list}
      </label> */}
    </li>
  );
}
