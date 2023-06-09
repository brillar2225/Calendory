import React, { useState } from 'react';
import TodoListForm from '../../components/form/TodoListForm';
import SubTaskItem from './SubTaskItem';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useAuthContext } from '../../hooks/useAuthContext';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TodoItem({ todo }) {
  const initialValues = {
    title: todo.title,
    desc: todo.desc,
    tags: todo.tags.join(),
    priority: todo.priority,
    subTask: todo.subTask.join(),
  };

  const { user } = useAuthContext();
  const [values, setValues] = useState(initialValues);
  const [isOpenSubTask, setIsOpenSubTask] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleClickEditModal = () => setIsOpenEditModal((prev) => !prev);
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, desc, tags, priority, subTask } = values;
      const subColRef = doc(
        collection(doc(db, 'calendory', user.uid), 'todos'),
        todo.id
      );
      await updateDoc(subColRef, {
        title,
        desc,
        tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
        priority,
        subTask:
          subTask !== '' ? subTask.split(',').map((tag) => tag.trim()) : [],
      });
      setIsOpenEditModal(false);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteDoc(
        doc(collection(doc(db, 'calendory', user.uid), 'todos'), todo.id)
      );
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  return (
    <>
      <li
        key={todo.id}
        className='relative inline-flex flex-col px-3 py-2 w-full border-b border-gray-200'
      >
        <h2 className='w-fit text-lg font-bold'>{todo.title}</h2>
        <h3 className='w-fit text-sm'>{todo.desc}</h3>
        <ul className='inline-flex flex-wrap space-x-2 my-2 text-sm'>
          {todo.tags.map((tag, index) => (
            <li
              key={index}
              className='px-3 py-1 rounded-full bg-primary-orange font-medium text-white'
            >
              {tag}
            </li>
          ))}
        </ul>
        <ul className='inline-flex flex-col w-fit'>
          {todo.subTask.length >= 1 && (
            <>
              <button
                type='button'
                className='inline-flex underline text-xs'
                onClick={() => setIsOpenSubTask((prev) => !prev)}
              >
                {isOpenSubTask ? '↑閉じる' : '↓サブタスクを確認する'}
              </button>
              {isOpenSubTask &&
                todo.subTask.map((list, idx) => (
                  <SubTaskItem key={idx} list={list} idx={idx} />
                ))}
            </>
          )}
        </ul>
        <div className='absolute top-3 right-4'>
          <button className='text-lg' onClick={handleClickEditModal}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className='text-gray-400 hover:text-black'
            />
          </button>
          <button className='ml-3 text-lg' onClick={handleDelete}>
            <FontAwesomeIcon
              icon={faTrashCan}
              className='text-gray-400 hover:text-black'
            />
          </button>
        </div>
      </li>
      {isOpenEditModal && (
        <TodoListForm
          btnName={'Edit'}
          values={values}
          handleClick={handleClickEditModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
