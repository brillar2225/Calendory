import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CalendarAddEventModal from './CalendarAddEventModal';
import PopUp from '../../components/ui/PopUp';
import useToggle from '../../hooks/useToggle';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

export default function Calendar() {
  const { uid } = useParams();
  const [events, setEvents] = useState([]);
  const [targetDate, setTargetDate] = useState(new Date());
  const [popUp, setPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({
    status: '',
    message: '',
  });

  const { toggle, handleToggle } = useToggle();

  const handlePopUp = (status, message) => {
    setPopUp(true);
    setTimeout(() => setPopUp(false), 5000);
    setPopUpInfo({ ...popUpInfo, status, message });
  };

  const handleAddEvent = (e) => {
    const target = e.date;

    setTargetDate(target);
    handleToggle();
  };

  useEffect(() => {
    const subColRef = collection(doc(db, 'calendory', uid), 'events');
    const unsubscribe = onSnapshot(subColRef, (snapshot) => {
      const newEvents = [];
      snapshot.forEach((doc) => {
        newEvents.push(doc.data());
        setEvents(() => [...newEvents]);
      });
    });
    return unsubscribe;
  });

  return (
    <article className='relative w-full h-full overflow-hidden'>
      <h1 className='sr-only'>
        {`${targetDate.getFullYear()}年${
          targetDate.getMonth() + 1
        }月カレンダー`}
      </h1>
      <PopUp />
      {popUp && <PopUp status={popUpInfo.status} message={popUpInfo.message} />}
      <div className={`p-2 h-full ${!toggle && 'opacity-10'}`}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable
          events={{ events }}
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
          targetDate={targetDate}
          onToggle={handleToggle}
          onPopUp={handlePopUp}
        />
      )}
    </article>
  );
}
