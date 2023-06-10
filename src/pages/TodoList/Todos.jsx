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
import TodoDiaryHeader from '../../components/form/TodoDiaryHeader';
import EventList from './EventList';
import TodoList from './TodoList';
import TodoListForm from '../../components/form/TodoListForm';
import Button from '../../components/ui/Button';
import { useAuthContext } from '../../hooks/useAuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import './todos.css';

export default function Todos() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenAddTodos, setIsOpenAddTodos] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  const onPrev = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() - 1))
    );
  const onNext = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() + 1))
    );

  const handleClick = () => setIsOpenAddTodos((prev) => !prev);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, desc, tags, priority, subTask } = values;
      const subColRef = doc(
        collection(doc(db, 'calendory', user.uid), 'todos')
      );
      await setDoc(subColRef, {
        createdAt: new Date(),
        date: selectedDate,
        id: subColRef.id,
        ownerId: user.uid,
        title,
        desc,
        tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
        priority,
        subTask:
          subTask !== '' ? subTask.split(',').map((tag) => tag.trim()) : [],
      });
      setValues(initialValues);
      setIsOpenAddTodos(false);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  useEffect(() => {
    const start = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString();
    const end = new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString();

    const subColRef = collection(doc(db, 'calendory', user.uid), 'events');
    const q = query(subColRef, where('start', '>=', start));
    const unsubscirbe = onSnapshot(q, (querySnapshot) => {
      const events = querySnapshot.docs
        .filter((doc) => doc.data().end <= end)
        .map((doc) => doc.data());
      setEvents(events);
    });
    return unsubscirbe;
  }, [selectedDate, user.uid]);

  useEffect(() => {
    const start = new Date(selectedDate.setHours(0, 0, 0, 0));
    const end = new Date(selectedDate.setHours(23, 59, 59, 999));

    const subColRef = collection(doc(db, 'calendory', user.uid), 'todos');
    const q = query(
      subColRef,
      where('date', '>=', start),
      where('date', '<=', end)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = querySnapshot.docs.map((doc) => doc.data());
      setTodos(todos);
    });
    return unsubscribe;
  }, [selectedDate, user.uid]);

  return (
    <article className='relative w-full h-full'>
      <h1 className='sr-only'>
        {`${selectedDate.getFullYear()}年${
          selectedDate.getMonth() + 1
        }月${selectedDate.getDate()}日のToDoリスト`}
      </h1>
      <div
        className={`max-h-full h-full ${
          isOpenAddTodos && 'opacity-10 pointer-events-none'
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
          <EventList events={events} />
          <TodoList todos={todos} />
          <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center max-w-2xl w-full'>
            <Button
              color={'blue'}
              type={'button'}
              title={'Add Todos'}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      {isOpenAddTodos && (
        <TodoListForm
          btnName={'Add'}
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
  desc: '',
  tags: '',
  priority: '',
  subTask: '',
};
