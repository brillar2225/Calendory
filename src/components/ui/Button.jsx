import React from 'react';

export default function Button({ color, type, title, onClick, children }) {
  switch (color) {
    case 'blue':
      return (
        <button type={type} onClick={onClick} className='btn btn-blue'>
          {title}
        </button>
      );
    case 'sub-blue':
      return (
        <button type={type} onClick={onClick} className='btn btn-sub-blue'>
          {title}
        </button>
      );
    case 'red':
      return (
        <button type={type} className='btn btn-red'>
          {title}
        </button>
      );
    case 'disabled':
      return (
        <button type={type} className='btn btn-disabled'>
          {title}
        </button>
      );
    case 'social':
      return (
        <button type={type} onClick={onClick} className='btn btn-social'>
          {children}
        </button>
      );
    default:
      return null;
  }
}
