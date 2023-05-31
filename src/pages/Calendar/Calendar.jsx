import React, { useEffect, useState } from 'react';
import CalendarAddEventModal from './CalendarAddEventModal';
import CalendarEditEventModal from './CalendarEditEventModal';
import PopUp from '../../components/ui/PopUp';
import { useAuthContext } from '../../hooks/useAuthContext';
import useToggle from '../../hooks/useToggle';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

export default function Calendar() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [targetDate, setTargetDate] = useState(new Date());
  const [targetObj, setTargetObj] = useState({});
  const [popUp, setPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({
    status: '',
    message: '',
  });

  const {
    addEventToggle,
    editEventToggle,
    handleAddEventToggle,
    handleEditEventToggle,
  } = useToggle();

  const handlePopUp = (status, message) => {
    setPopUp(true);
    setTimeout(() => setPopUp(false), 4000);
    setPopUpInfo({ ...popUpInfo, status, message });
  };

  const handleAddEvent = (e) => {
    const targetDate = e.date;

    setTargetDate(targetDate);
    handleAddEventToggle();
  };

  const handleEditEvent = (e) => {
    const target = e.event;
    const targetObj = events.find((event) => event.id === target.id);
    targetObj.start = new Date(targetObj.start);
    targetObj.end = new Date(targetObj.end);

    setTargetObj(targetObj);
    handleEditEventToggle();
  };

  useEffect(() => {
    const subColRef = collection(doc(db, 'calendory', user.uid), 'events');
    const unsubscribe = onSnapshot(subColRef, (snapshot) => {
      const events = snapshot.docs.map((doc) => doc.data());
      setEvents(events);
    });
    return unsubscribe;
  }, [user.uid]);

  return (
    <article className='relative w-full h-full overflow-hidden'>
      <h1 className='sr-only'>
        {`${targetDate.getFullYear()}年${
          targetDate.getMonth() + 1
        }月カレンダー`}
      </h1>
      {popUp && <PopUp status={popUpInfo.status} message={popUpInfo.message} />}
      <div
        className={`p-2 h-full ${
          (addEventToggle || editEventToggle) &&
          'opacity-10 pointer-events-none'
        }`}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable
          events={{ events }}
          dateClick={handleAddEvent}
          eventClick={handleEditEvent}
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
      {addEventToggle && (
        <CalendarAddEventModal
          user={user}
          targetDate={targetDate}
          onToggle={handleAddEventToggle}
          onPopUp={handlePopUp}
        />
      )}
      {editEventToggle && (
        <CalendarEditEventModal
          user={user}
          targetObj={targetObj}
          toggle={editEventToggle}
          onToggle={handleEditEventToggle}
          onPopUp={handlePopUp}
        />
      )}
    </article>
  );
}
