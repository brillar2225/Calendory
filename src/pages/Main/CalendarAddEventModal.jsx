import { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import CalendarEventModal from '../../components/form/CalendarEventModal';
import { db } from '../../api/firebase';

const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const ADD_SUCCESS = '✅ イベントを追加しました';
const ADD_ERROR = '❌ イベントが追加できませんでした';

export default function CalendarAddEventModal({
  user,
  targetDate,
  onToggle,
  onPopUp,
}) {
  const [values, setValues] = useState({
    title: '',
    desc: '',
    allDay: false,
    start: new Date(targetDate.toString()),
    end: new Date(targetDate.toString()),
    priority: '',
  });

  const handleFilterTime = (time) => {
    const selectedDate = new Date(time);

    return values.start.getTime() < selectedDate.getTime();
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, desc, allDay, start, end, priority } = values;
      const initStart = allDay ? new Date(start.setHours(0, 0, 0, 0)) : start;
      const initEnd = allDay ? new Date(end.setHours(23, 59, 59, 999)) : end;
      const subColRef = doc(
        collection(doc(db, 'calendory', user.uid), 'events')
      );
      await setDoc(subColRef, {
        createdAt: new Date(),
        id: subColRef.id,
        ownerId: user.uid,
        title,
        desc,
        allDay,
        start: initStart.toISOString(),
        end: initEnd.toISOString(),
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
    <CalendarEventModal
      values={values}
      setValues={setValues}
      handleFilterTime={handleFilterTime}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onToggle={onToggle}
      btnTitle={'Add Event'}
    />
  );
}
