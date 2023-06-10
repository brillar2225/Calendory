import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  return (
    <>
      {todos.length >= 1 && (
        <>
          <h1 className='inline-block p-2 mt-2 bg-slate-50 rounded-md text-xl font-semibold text-primary-black'>
            今日のタスク
          </h1>
          <ul className='rounded-xl shadow-xl bg-slate-50'>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
