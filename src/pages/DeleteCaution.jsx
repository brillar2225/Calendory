import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function DeleteCaution({ user, onClick, onSubmit }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center p-6 absolute bottom-0 rounded-lg shadow-lg bg-white'>
      <FontAwesomeIcon
        icon={faXmark}
        className='h-6 w-6 p-2 absolute top-px right-px'
        onClick={onClick}
      />
      <h2 className='text-2xl font-bold'>注意</h2>
      <h4 className='text-base md:text-lg mt-6'>
        アカウントを削除すると二度と{user.displayName}
        様に関するアカウント情報を復元することは出来ません。
      </h4>
      <h3 className='text-base md"text-lg text-button-red mt-6'>
        本当にアカウントを削除しますか？
      </h3>
      <div className='inline-flex items-center text-sm md:text-base mt-6'>
        <input
          type='checkbox'
          name='checked'
          id='checked'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className='mr-2'
        />
        <label htmlFor='checked'>削除します。</label>
      </div>
      <button
        disabled={!isChecked}
        type='submit'
        className='h-11 w-1/2 mt-3 text-lg disabled:bg-slate-400 rounded-lg border-none bg-button-red text-white'
        onClick={onSubmit}
      >
        Delete Account
      </button>
    </div>
  );
}
