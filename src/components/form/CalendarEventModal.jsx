import React from 'react';
import DatePicker from 'react-datepicker';
import DeleteEventModal from './DeleteEventModal';
import Button from '../ui/Button';

export default function CalendarEventModal({
  values,
  setValues,
  handleFilterTime,
  handleChange,
  handleSubmit,
  handleDelete,
  toggle,
  onToggle,
  isModalOpen,
  openModal,
  closeModal,
  btnTitle,
}) {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[350px] w-full max-h-[550px] h-full bg-slate-100 rounded-xl shadow-lg z-10 sm:max-w-md md:max-w-lg lg:max-w-xl'>
      <form
        className={`flex flex-col justify-center items-center w-9/10 h-full m-auto ${
          isModalOpen && 'opacity-50'
        }`}
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='title'
          placeholder='タイトル'
          maxLength='30'
          className={`w-9/10 px-3 py-2 rounded-lg ${toggle && 'mt-4'}`}
          value={values.title}
          onChange={handleChange}
          required
        />
        <textarea
          type='text'
          name='desc'
          placeholder='詳細メモ(300字以内)'
          maxLength='300'
          className='w-9/10 min-h-[150px] mt-3 px-3 py-2 rounded-lg'
          value={values.desc}
          onChange={handleChange}
        />
        <div className='w-9/10 mt-3'>
          <div className='flex flex-col items-center'>
            <div className='relative flex justify-between items-center w-full text-base cursor-pointer'>
              <span className='font-medium text-gray-900'>終日</span>
              <label
                htmlFor='allDay'
                className='h-6 w-12 text-gray-900 font-medium'
              >
                <input
                  type='checkbox'
                  name='allDay'
                  id='allDay'
                  className='sr-only'
                  onChange={() =>
                    setValues({ ...values, allDay: !values.allDay })
                  }
                  checked={values.allDay}
                />
                <span className='block toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-12 rounded-full'></span>
              </label>
            </div>
            <div className='flex items-center w-full mt-3'>
              <span className='w-1/5 font-medium'>開始日</span>
              {values.allDay ? (
                <DatePicker
                  name='start'
                  selected={values.start}
                  onChange={(date) => setValues({ ...values, start: date })}
                  selectsStart
                  startDate={values.start}
                  endDate={values.end}
                  dateFormat='yyyy年MM月dd日'
                />
              ) : (
                <DatePicker
                  name='start'
                  selected={values.start}
                  onChange={(date) => setValues({ ...values, start: date })}
                  selectsStart
                  startDate={values.start}
                  endDate={values.end}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={5}
                  timeCaption='time'
                  dateFormat='yyyy年MM月dd日 HH:mm'
                />
              )}
            </div>
            <div className='flex items-center w-full mt-3'>
              <span className='w-1/5 font-medium'>終了日</span>
              {values.allDay ? (
                <DatePicker
                  name='end'
                  selected={values.end}
                  onChange={(date) => setValues({ ...values, end: date })}
                  selectsEnd
                  startDate={values.start}
                  endDate={values.end}
                  minDate={values.start}
                  dateFormat='yyyy年MM月dd日'
                />
              ) : (
                <DatePicker
                  name='end'
                  selected={values.end}
                  onChange={(date) => setValues({ ...values, end: date })}
                  selectsEnd
                  startDate={values.start}
                  endDate={values.end}
                  minDate={values.start}
                  showTimeSelect
                  filterTime={handleFilterTime}
                  timeFormat='HH:mm'
                  timeIntervals={5}
                  timeCaption='time'
                  dateFormat='yyyy年MM月dd日 HH:mm'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-between w-9/10 my-3'>
          <label htmlFor='priority' className='font-medium'>
            優先順位
          </label>
          <select
            name='priority'
            id='priority'
            className='bg-transparent'
            value={values.priority}
            onChange={handleChange}
          >
            <option value='select'>選択</option>
            <option value='highest'>最高</option>
            <option value='high'>高</option>
            <option value='middle'>中</option>
            <option value='low'>低</option>
            <option value='lowest'>最低</option>
          </select>
        </div>
        <div className='flex flex-col items-center w-9/10 mt-3'>
          <div className='inline-flex justify-between space-x-2 w-full'>
            <Button
              color={'sub-blue'}
              type={'button'}
              title={'Cancel'}
              onClick={onToggle}
            />
            <Button color={'blue'} type={'submit'} title={btnTitle} />
          </div>
          {toggle && (
            <button
              type='button'
              className='mt-3 mb-4 text-sm text-button-red underline'
              onClick={openModal}
            >
              日程を削除する
            </button>
          )}
        </div>
      </form>
      {toggle && (
        <DeleteEventModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
