import React, { useState } from 'react';
import CalendarAddEventModal from './CalendarAddEventModal';
import useToggle from '../../hooks/useToggle';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

export default function Calendar() {
  const [targetDate, setTargetDate] = useState(new Date());
  const { toggle, handleToggle } = useToggle();

  const handleAddEvent = (e) => {
    const target = e.date;

    handleToggle();
    setTargetDate(target);
  };

  return (
    <article className='relative w-full h-full'>
      <h1 className='sr-only'>
        {`${targetDate.getFullYear()}年${
          targetDate.getMonth() + 1
        }月カレンダー`}
      </h1>
      <div className={`p-2 h-full ${!toggle && 'opacity-10'}`}>
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
      </div>
      {!toggle && (
        <CalendarAddEventModal
          onToggle={handleToggle}
          targetDate={targetDate}
        />
      )}
    </article>
  );
}
