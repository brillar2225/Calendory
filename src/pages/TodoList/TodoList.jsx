import React, { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import DatePicker from 'react-datepicker';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './todoList.css';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../api/firebase';

export default function TodoList() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenTodos, setIsOpenTodos] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [todos, setTodos] = useState([]);

  const onPrev = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() - 1))
    );
  const onNext = () =>
    setSelectedDate(
      (prev) => new Date(prev.setDate(selectedDate.getDate() + 1))
    );

  const handleClick = () => setIsOpenTodos((prev) => !prev);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subColRef = doc(collection(doc(db, 'calendory', user.uid), 'todos'));
    await setDoc(subColRef, {
      createdAt: new Date(),
      date: selectedDate,
      id: subColRef.id,
      ownerId: user.uid,
      title: values.title,
      desc: values.desc,
      tags: values.tags.split(',').map((tag) => tag.trim()),
      priority: values.priority,
      subTask: values.subTask.split(',').map((tag) => tag.trim()),
    });
    setValues(initialValues);
    setIsOpenTodos(false);
  };

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
          isOpenTodos && 'opacity-10 pointer-events-none'
        }`}
      >
        <div className='w-full border-b-2'>
          <div className='flex justify-center items-center m-auto max-w-sm w-full h-13 sm:max-w-md md:max-w-lg'>
            <button
              className='w-10 h-10 mx-3 rounded-full bg-slate-100 shadow-md'
              onClick={onPrev}
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className='w-5 h-5 p-1 text-primary-black align-middle rounded-full'
              />
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
            <button
              className='w-10 h-10 mx-3 rounded-full bg-slate-100 shadow-md'
              onClick={onNext}
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                className='w-5 h-5 p-1 text-primary-black align-middle rounded-full'
              />
            </button>
          </div>
        </div>
        <div className='relative w-full h-9/10 bg-slate-100'>
          <ul>
            {todos.map((todo, idx) => (
              <li key={idx}>
                <h1>{todo.title}</h1>
                <h2>{todo.desc}</h2>
                <ul>
                  {todo.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
                <ul>
                  {todo.subTask.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className='absolute bottom-5 flex justify-center w-full'>
            <Button
              color={'blue'}
              type={'button'}
              title={'Add Todos'}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      {isOpenTodos && (
        <form
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center px-5 py-8 max-w-xs w-full border border-slate-100 bg-slate-50 rounded-xl drop-shadow-2xl z-40 sm:max-w-md md:max-w-lg'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            name='title'
            placeholder='タイトル'
            className='px-3 py-2 mb-3 w-full h-12 text-sm shadow-lg rounded-lg focus:outline-none'
            value={values.title}
            onChange={handleChange}
            required
          />
          <textarea
            name='desc'
            placeholder='メモ'
            className='px-3 py-2 mb-3 w-full max-h-32 text-sm shadow-lg rounded-lg focus:outline-none'
            value={values.desc}
            onChange={handleChange}
          />
          <input
            type='text'
            name='tags'
            placeholder='タグ(コンマ(,)をつける)'
            className='px-3 py-2 mb-3 w-full h-12 text-sm shadow-lg rounded-lg focus:outline-none'
            value={values.tags}
            onChange={handleChange}
          />
          <select
            name='priority'
            id='priority'
            className='px-3 py-2 mb-3 w-full h-12 text-sm shadow-lg rounded-lg focus:outline-none'
            value={values.priority}
            onChange={handleChange}
          >
            <option value='select'>優先順位</option>
            <option value='highest'>最高</option>
            <option value='high'>高</option>
            <option value='middle'>中</option>
            <option value='low'>低</option>
            <option value='lowest'>最低</option>
          </select>
          <input
            type='text'
            name='subTask'
            placeholder='サブタスク(コンマ(,)をつける)'
            className='px-3 py-2 mb-3 w-full h-12 text-sm shadow-lg rounded-lg focus:outline-none'
            value={values.subTask}
            onChange={handleChange}
          />
          <div className='flex flex-col items-center w-full mt-2'>
            <div className='inline-flex justify-between space-x-2 w-full'>
              <Button
                color={'sub-blue'}
                type={'button'}
                title={'Cancel'}
                onClick={handleClick}
              />
              <Button
                color={'blue'}
                type={'submit'}
                title={'Add'}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
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
