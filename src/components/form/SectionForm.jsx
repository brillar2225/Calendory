import React from 'react';

export default function SectionForm({ srTitle, title, error, children }) {
  return (
    <section className='relative h-9/10'>
      <h1 className='sr-only'>{srTitle}</h1>
      <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
        <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
          <h1 className='text-2xl font-bold my-3'>{title}</h1>
          {error && <h3 className='error'>{error}</h3>}
          {children}
        </div>
      </div>
    </section>
  );
}
