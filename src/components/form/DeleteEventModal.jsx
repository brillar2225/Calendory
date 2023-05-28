import React from 'react';
import Button from '../ui/Button';

export default function DeleteEventModal({
  isModalOpen,
  closeModal,
  handleDelete,
}) {
  return (
    <>
      {isModalOpen && (
        <div className='flex flex-col items-center justify-evenly absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 max-w-xs w-full h-72 rounded-xl bg-white drop-shadow-md z-40'>
          <h2 className='text-lg font-bold text-button-red'>
            本当に削除しますか？
          </h2>
          <h5>
            一度削除した日程の情報は復元できません。それでも削除したい場合は、以下のDeleteボタンを押下して下さい。
          </h5>
          <div className='flex flex-col items-center w-9/10 mt-3'>
            <div className='inline-flex justify-between space-x-2 w-full'>
              <Button
                color={'sub-blue'}
                type={'button'}
                title={'Close'}
                onClick={closeModal}
              />
              <Button
                color={'red'}
                type={'button'}
                title={'Delete'}
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
