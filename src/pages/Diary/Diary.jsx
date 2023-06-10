import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import DiaryForm from '../../components/form/DiaryForm';
import DiaryList from './DiaryList';
import TodoDiaryHeader from '../../components/form/TodoDiaryHeader';
import Button from '../../components/ui/Button';

export default function Diary() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenAddDairy, setIsOpenAddDairy] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [diaries, setDiaries] = useState([]);

  const onPrev = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() - 1))
    );
  const onNext = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() + 1))
    );
  const handleClick = () => setIsOpenAddDairy((prev) => !prev);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, content } = values;
      const subColRef = doc(
        collection(doc(db, 'calendory', user.uid), 'diaries')
      );
      await setDoc(subColRef, {
        createdAt: new Date(),
        editedAt: null,
        date: selectedDate,
        id: subColRef.id,
        ownerId: user.uid,
        title,
        content,
      });
      setValues(initialValues);
      setIsOpenAddDairy(false);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  useEffect(() => {
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    const subColRef = collection(doc(db, 'calendory', user.uid), 'diaries');
    const q = query(
      subColRef,
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const diaries = querySnapshot.docs.map((doc) => doc.data());
      setDiaries(diaries);
    });
    return unsubscribe;
  }, [selectedDate, user.uid]);

  return (
    <article className='relative w-full h-full'>
      <h1 className='sr-only'>
        {`${selectedDate.getFullYear()}年${
          selectedDate.getMonth() + 1
        }月${selectedDate.getDate()}日のダイアリー`}
      </h1>
      <div
        className={`max-h-full h-full ${
          isOpenAddDairy && 'opactiy-10 pointer-events-none'
        }`}
      >
        <div className='w-full border-b-2'>
          <TodoDiaryHeader
            onPrev={onPrev}
            onNext={onNext}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className='relative p-2 w-full h-[95%] bg-slate-100 overflow-y-auto'>
          <DiaryList diaries={diaries} />
          <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center max-w-4xl w-full md:bottom-6 lg:bottom-7'>
            <Button
              color={'blue'}
              type={'button'}
              title={'Add Diary'}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      {isOpenAddDairy && (
        <DiaryForm
          btnName={'Add Diary'}
          values={values}
          handleClick={handleClick}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </article>
  );
}

const initialValues = {
  title: '',
  content: '',
};
