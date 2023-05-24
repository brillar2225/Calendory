import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const ADD_SUCCESS = '✅ イベントを追加しました';
const ADD_ERROR = '❌ イベントが追加できませんでした';

export default function CalendarAddEventModal({
  targetDate,
  onToggle,
  onPopUp,
}) {
  const { uid } = useParams();
  const [values, setValues] = useState({
    title: '',
    desc: '',
    allDay: false,
    start: new Date(targetDate.toString()),
    end: new Date(targetDate.toString()),
    priority: '',
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, desc, allDay, start, end, priority } = values;
      if (allDay === true) {
        start.setHours(0, 0);
        end.setHours(0, 0);
      }
      const subColRef = doc(collection(doc(db, 'calendory', uid), 'events'));
      await setDoc(subColRef, {
        createdAt: new Date(),
        eventId: subColRef.id,
        ownerId: uid,
        title,
        desc,
        allDay,
        start: start.toISOString(),
        end: end.toISOString(),
        priority,
      });
      onPopUp(STATUS_SUCCESS, ADD_SUCCESS);
      onToggle();
    } catch (e) {
      console.log(e.code, e.message);
      onPopUp(STATUS_ERROR, ADD_ERROR);
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[350px] w-full max-h-[550px] h-5/6 bg-slate-100 rounded-xl shadow-lg z-10 sm:max-w-md md:max-w-lg lg:max-w-xl'>
      <form
        className='flex flex-col justify-center items-center w-9/10 h-full m-auto'
        onSubmit={handleSubmit}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className='h-5 w-5 p-2 absolute top-1 right-1 md:top-2 md:right-2'
          onClick={onToggle}
        />
        <input
          type='text'
          name='title'
          placeholder='タイトル'
          maxLength='30'
          className='w-9/10 px-3 py-2 rounded-lg'
          value={values.title}
          onChange={handleChange}
          required
        />
        <textarea
          type='text'
          name='desc'
          placeholder='詳細メモ(300字以内)'
          maxLength='300'
          className='w-9/10 min-h-[100px] md:min-h-[125px] lg:min-h-[150px] mt-3 md:mt-4 px-3 py-2 rounded-lg'
          value={values.desc}
          onChange={handleChange}
        />
        <div className='w-9/10 mt-3 md:mt-4'>
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
            <div className='flex items-center w-full mt-2 md:mt-3'>
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
            <div className='flex items-center w-full mt-2 md:mt-3'>
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
                  timeFormat='HH:mm'
                  timeIntervals={5}
                  timeCaption='time'
                  dateFormat='yyyy年MM月dd日 HH:mm'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-between w-9/10 my-3 md:my-4'>
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
        <Button color={'blue'} type={'submit'} title={'Add Event'}></Button>
      </form>
    </div>
  );
}
