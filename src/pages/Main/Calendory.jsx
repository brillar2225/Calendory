import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Calendory() {
  const [currentTab, setCurrentTab] = useState();

  const tabs = [
    {
      id: 0,
      label: 'カレンダー',
      url: 'calendar',
    },
    {
      id: 1,
      label: 'ToDoリスト',
      url: 'todo',
    },
    {
      id: 2,
      label: 'ダイアリー',
      url: 'diary',
    },
  ];

  const handleCurrentTab = (id) => setCurrentTab(id);

  return (
    <section className='flex flex-col flex-1 overflow-auto w-full h-9/10 mt-2 lg:flex-row'>
      <h1 className='sr-only'>Calendory</h1>
      <aside className='aside max-lg:aside-row lg:aside-col'>
        {tabs.map((tab, idx) => {
          return (
            <button
              type='button'
              key={idx}
              onClick={() => handleCurrentTab(tab.id)}
              className={`tab max-lg:tab-row lg:tab-col ${
                idx === currentTab && 'focused'
              }`}
            >
              <Link
                to={tab.url}
                className='inline-block px-3 py-4 w-full h-full'
              >
                {tab.label}
              </Link>
            </button>
          );
        })}
      </aside>
      <Outlet />
    </section>
  );
}
