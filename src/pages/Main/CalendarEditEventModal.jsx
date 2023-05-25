import React, { useState } from 'react';
import CalendarEventModal from './CalendarEventModal';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useParams } from 'react-router-dom';

const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const EDIT_SUCCESS = '✅ イベントを修正しました';
const EDIT_ERROR = '❌ イベントが修正できませんでした';

export default function CalendarEditEventModal({
  targetObj,
  onToggle,
  onPopUp,
}) {
  const { uid } = useParams();
  const [values, setValues] = useState(targetObj);

  const handleFilterTime = (time) => {
    const selectedDate = new Date(time);

    return values.start.getTime() < selectedDate.getTime();
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, title, desc, allDay, start, end, priority } = values;
      const initStart = allDay ? new Date(start.setHours(0, 0, 0, 0)) : start;
      const initEnd = allDay ? new Date(end.setHours(23, 59, 59, 999)) : end;
      const subColRef = doc(
        collection(doc(db, 'calendory', uid), 'events'),
        id
      );
      await updateDoc(subColRef, {
        title,
        desc,
        allDay,
        start: initStart.toISOString(),
        end: initEnd.toISOString(),
        priority,
      });
      onPopUp(STATUS_SUCCESS, EDIT_SUCCESS);
      onToggle();
    } catch (e) {
      console.log(e.code, e.message);
      onPopUp(STATUS_ERROR, EDIT_ERROR);
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
      btnTitle={'Edit Event'}
    />
  );
}
