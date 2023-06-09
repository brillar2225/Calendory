import React from 'react';
import DatePicker from 'react-datepicker';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TodoHeader({
  onPrev,
  onNext,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div className='flex justify-center items-center m-auto max-w-sm w-full h-13 sm:max-w-md md:max-w-lg'>
      <button
        className='w-10 h-10 mx-3 rounded-full bg-slate-100 shadow-md'
        onClick={onPrev}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className='w-5 h-5 p-1 text-primary-black align-middle rounded-full'
        />
      </button>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat='yyyy年MM月dd日'
      />
      <button
        className='w-10 h-10 mx-3 rounded-full bg-slate-100 shadow-md'
        onClick={onNext}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          className='w-5 h-5 p-1 text-primary-black align-middle rounded-full'
        />
      </button>
    </div>
  );
}
