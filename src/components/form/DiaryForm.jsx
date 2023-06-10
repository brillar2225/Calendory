import React from 'react';
import Button from '../ui/Button';

export default function DiaryForm({
  btnName,
  values,
  handleClick,
  handleChange,
  handleSubmit,
}) {
  return (
    <form
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center px-5 py-8 max-w-xs w-full border border-slate-100 bg-slate-50 rounded-xl drop-shadow-2xl z-40 sm:max-w-md md:max-w-lg'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='title'
        placeholder='タイトル'
        className='px-3 py-2 mb-3 w-full h-12 text-sm shadow-lg rounded-lg focus:outline-none'
        value={values.title}
        onChange={handleChange}
        required
      />
      <textarea
        name='context'
        placeholder='あなたの今日を自由に記録してみて下さい！'
        className='px-3 py-2 mb-3 w-full max-h-96 h-32 text-sm shadow-lg rounded-lg focus:outline-none'
        value={values.context}
        onChange={handleChange}
      />
      <div className='flex flex-col items-center w-full mt-2'>
        <div className='inline-flex justify-between space-x-2 w-full'>
          <Button
            color={'sub-blue'}
            type={'button'}
            title={'Cancel'}
            onClick={handleClick}
          />
          <Button
            color={'blue'}
            type={'submit'}
            title={btnName}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}
