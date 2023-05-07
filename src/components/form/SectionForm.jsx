import React from 'react';

export default function SectionForm({ srTitle, title, step, error, children }) {
  return (
    <section className='relative h-9/10'>
      <h1 className='sr-only'>{srTitle}</h1>
      <div className='h-full flex flex-col items-center justify-center bg-slate-50'>
        <div className='max-w-xs md:max-w-md w-full text-center rounded-lg shadow-lg p-6 bg-white'>
          <h1 className='text-2xl font-bold my-3'>{title}</h1>
          {step && (
            <h2 className='inline-flex justify-start w-9/10 mt-3 mb-5 text-lg'>
              STEP {step}
            </h2>
          )}
          {error && <h3 className='error'>{error}</h3>}
          {children}
        </div>
      </div>
    </section>
  );
}
