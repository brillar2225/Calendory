import React from 'react';

export default function InputForm({
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      className='input'
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}
