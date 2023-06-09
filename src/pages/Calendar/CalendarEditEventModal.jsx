import React, { useState } from 'react';
import CalendarEventModalForm from '../../components/form/CalendarEventModalForm';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';

const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const EDIT_SUCCESS = '✅ イベントを変更しました。';
const DELETE_SUCCESS = '✅ イベントを削除しました。';
const EDIT_ERROR = '❌ イベントが変更できませんでした。';
const AUTH_ERROR = '❌ 権限がありません。再度ログインして下さい。';
const DELETE_ERROR = '❌ イベントが削除できませんでした。';

export default function CalendarEditEventModal({
  user,
  targetObj,
  toggle,
  onToggle,
  onPopUp,
}) {
  const [values, setValues] = useState(targetObj);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleFilterTime = (time) => {
    const selectedDate = new Date(time);

    return values.start.getTime() < selectedDate.getTime();
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, ownerId, title, desc, allDay, start, end, priority } = values;
      if (!user.uid === ownerId) return onPopUp(STATUS_ERROR, AUTH_ERROR);
      const initStart = allDay ? new Date(start.setHours(0, 0, 0, 0)) : start;
      const initEnd = allDay ? new Date(end.setHours(23, 59, 59, 999)) : end;
      const subColRef = doc(
        collection(doc(db, 'calendory', user.uid), 'events'),
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

  const handleDelete = async () => {
    try {
      const { id, ownerId } = values;
      if (!user.uid === ownerId) return onPopUp(STATUS_ERROR, AUTH_ERROR);
      await deleteDoc(
        doc(collection(doc(db, 'calendory', user.uid), 'events'), id)
      );
      onPopUp(STATUS_SUCCESS, DELETE_SUCCESS);
      onToggle();
    } catch (e) {
      console.log(e.code, e.message);
      onPopUp(STATUS_ERROR, DELETE_ERROR);
    }
  };

  return (
    <CalendarEventModalForm
      values={values}
      setValues={setValues}
      handleFilterTime={handleFilterTime}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      toggle={toggle}
      onToggle={onToggle}
      isModalOpen={isModalOpen}
      openModal={openModal}
      closeModal={closeModal}
      btnTitle={'Edit Event'}
    />
  );
}
