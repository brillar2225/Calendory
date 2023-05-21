import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import useToggle from '../../hooks/useToggle';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

function AddEventModal({ dateStr }) {
  const [startDate, setStartDate] = useState(new Date(dateStr));
  const [endDate, setEndDate] = useState(new Date(dateStr));
  const { toggle, handleToggle } = useToggle();

  const year = dateStr.replace(/-/g, '').slice(0, 4) + '年';
  const month = dateStr.replace(/-/g, '').slice(4, 6) + '月';
  const date = dateStr.replace(/-/g, '').slice(6, 8) + '日';
  const fullDate = year + month + date;

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[350px] w-full h-5/6 bg-slate-100 rounded-xl z-10 sm:max-w-md md:max-w-lg lg:max-w-xl'>
      <form className='flex flex-col justify-center items-center w-9/10 h-full m-auto'>
        <h1 className='text-2xl font-bold mb-3 md:mb-4 lg:mb-5'>{fullDate}</h1>
        <input
          type='text'
          placeholder='タイトル'
          maxLength='30'
          className='w-9/10 my-1 md:my-2 px-3 py-2 rounded-lg'
          required
        />
        <textarea
          type='text'
          placeholder='詳細メモ(300字以内)'
          maxLength='300'
          className='w-9/10 min-h-[100px] md:min-h-[125px] lg:min-h-[150px] my-1 md:my-2 px-3 py-2 rounded-lg'
        />
        <div className='w-9/10 mb-1 md:mb-2'>
          <div className='flex flex-col items-center'>
            <div className='relative flex justify-between items-center w-full my-1 text-base cursor-pointer'>
              <span className='font-medium text-gray-900'>終日</span>
              <label
                htmlFor='allday'
                className='h-6 w-12 text-gray-900 font-medium'
              >
                <input
                  type='checkbox'
                  name='allday'
                  id='allday'
                  className='sr-only'
                  onChange={handleToggle}
                  checked={!toggle}
                />
                <span className='block toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-12 rounded-full'></span>
              </label>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={1}
              timeCaption='time'
              dateFormat='yyyy年MM月dd HH:mm'
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={1}
              timeCaption='time'
              dateFormat='yyyy年MM月dd HH:mm'
            />
          </div>
        </div>
        <div className='flex justify-between w-9/10 my-1 md:my-2'>
          <label htmlFor='priority' className='font-medium'>
            優先順位
          </label>
          <select name='priority' id='priority'>
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

export default function Calendar() {
  // const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const { toggle, handleToggle } = useToggle();

  const handleAddEvent = (e) => {
    const target = e.dateStr;

    handleToggle();
    setSelectedDate(target);
  };

  return (
    <article className='relative w-full h-full'>
      <h1 className='sr-only'>
        {`${new Date().getFullYear()}年${new Date().getMonth() + 1}月`}
        のカレンダー
      </h1>
      <div className='p-2 h-full'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable
          dateClick={handleAddEvent}
          initialView='dayGridMonth'
          locale={'ja'}
          headerToolbar={{
            start: 'title',
            center: '',
            end: 'prevYear prev today next nextYear',
          }}
          buttonText={{
            today: '今日',
          }}
          buttonIcons={{
            prev: 'chevron-left',
            next: 'chevron-right',
            prevYear: 'chevrons-left',
            nextYear: 'chevrons-right',
          }}
          height={'100%'}
        />
        {!toggle && <AddEventModal dateStr={selectedDate} />}
      </div>
    </article>
  );
}
