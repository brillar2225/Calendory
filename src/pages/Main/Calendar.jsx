import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  return (
    <article className='w-full h-full'>
      <h1 className='sr-only'>{`${year}年${month + 1}月`}のカレンダー</h1>
      <div className='p-2 h-full'>
        <FullCalendar
          plugins={[dayGridPlugin]}
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
    </article>
  );
}
