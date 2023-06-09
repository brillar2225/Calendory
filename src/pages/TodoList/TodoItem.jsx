import React, { useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubTaskItem from './SubTaskItem';

export default function TodoItem({ todo, idx }) {
  const [isOpenSubTask, setIsOpenSubTask] = useState(false);

  return (
    <li
      key={idx}
      className='relative inline-flex flex-col px-3 py-2 w-full border-b border-gray-200'
    >
      <h2 className='w-fit text-lg font-bold'>{todo.title}</h2>
      <h3 className='w-fit text-sm'>{todo.desc}</h3>
      <ul className='inline-flex flex-wrap space-x-2 my-2 text-sm'>
        {todo.tags.map((tag, index) => (
          <li
            key={index}
            className='px-3 py-1 rounded-full bg-primary-orange font-medium text-white'
          >
            {tag}
          </li>
        ))}
      </ul>
      <ul className='inline-flex flex-col w-fit'>
        {todo.subTask.length >= 1 && (
          <>
            <button
              type='button'
              className='inline-flex underline text-xs'
              onClick={(e) => setIsOpenSubTask((prev) => !prev)}
            >
              {isOpenSubTask ? '↑閉じる' : '↓サブタスクを確認する'}
            </button>
            {isOpenSubTask &&
              todo.subTask.map((list, idx) => (
                <SubTaskItem list={list} idx={idx} />
              ))}
          </>
        )}
      </ul>
      <button className='absolute top-4 right-4 text-lg'>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className='text-gray-400 hover:text-black'
        />
      </button>
    </li>
  );
}
