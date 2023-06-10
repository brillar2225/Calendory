import React, { useState } from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import DiaryForm from '../../components/form/DiaryForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function DiaryItem({ diary }) {
  const initialValues = {
    title: diary.title,
    content: diary.content,
  };

  const { user } = useAuthContext();
  const [values, setValues] = useState(initialValues);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const handleReadMore = () => setIsReadMore((prev) => !prev);
  const handleClick = () => setIsOpenEditModal((prev) => !prev);
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, content } = values;
      const subDocRef = doc(
        collection(doc(db, 'calendory', user.uid), 'diaries'),
        diary.id
      );
      await updateDoc(subDocRef, {
        editedAt: new Date(),
        title,
        content,
      });
      setIsOpenEditModal(false);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteDoc(
        doc(collection(doc(db, 'calendory', user.uid), 'diaries'), diary.id)
      );
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  return (
    <>
      <li className='flex items-center m-auto w-9/10 border-b border-gray-200'>
        <div className='flex-1 px-5 py-2 mr-5 rounded-lg'>
          <h2 className='text-base font-bold'>{diary.title}</h2>
          <p className='text-xs text-gray-500'>
            {diary.editedAt !== null
              ? `${diary.editedAt
                  .toDate()
                  .toLocaleString('ja-JP')}に修正されました。`
              : `${diary.createdAt
                  .toDate()
                  .toLocaleString('ja-JP')}に作成されました。`}
          </p>
          {diary.content.length >= 100 ? (
            <h3 className='mt-2 text-sm whitespace-pre-wrap'>
              {isReadMore
                ? diary.content + ' '
                : diary.content.slice(0, 100) + ' '}
              <span
                onClick={handleReadMore}
                className='underline text-neutral-400 cursor-pointer'
              >
                {isReadMore ? '閉じる' : 'さらに'}
              </span>
            </h3>
          ) : (
            <h3 className='mt-2 text-sm whitespace-pre-wrap'>
              {diary.content}
            </h3>
          )}
        </div>
        <div className='basis-15'>
          <button className='p-1 text-lg' onClick={handleClick}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className='text-gray-400 hover:text-black'
            />
          </button>
          <button className='p-1 ml-2 text-lg' onClick={handleDelete}>
            <FontAwesomeIcon
              icon={faTrashCan}
              className='text-gray-400 hover:text-black'
            />
          </button>
        </div>
      </li>
      {isOpenEditModal && (
        <DiaryForm
          btnName={'Edit Diary'}
          values={values}
          handleClick={handleClick}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
