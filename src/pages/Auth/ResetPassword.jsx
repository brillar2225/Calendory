import React, { useState } from 'react';
import useUser from '../../hooks/User/useUser';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function FirstStep({ step, error, displayName, onChange, onNext }) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-evenly h-5/6 w-11/12 relative'>
      <label className='text-lg text-left w-9/10' htmlFor='first'>
        STEP {step}
      </label>
      {error && (
        <h3 className='text-xs md:text-sm text-rose-700 absolute top-2/7'>
          {error}
        </h3>
      )}
      <input
        className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
        type='text'
        placeholder='Enter username'
        name='displayName'
        id='first'
        value={displayName}
        onChange={onChange}
        required
      />
      <div className='inline-flex justify-between w-9/10'>
        <button
          className='h-11 w-1/2 rounded-lg border border-button-blue text-button-blue mr-2'
          onClick={() => navigate(-1)}
        >
          Previous
        </button>
        <button
          className='h-11 w-1/2 rounded-lg border-none bg-button-blue text-white'
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SecondStep({ step, error, email, onChange, onPrev, onSubmit }) {
  return (
    <div className='flex flex-col items-center justify-evenly h-5/6 w-11/12 relative'>
      <label className='text-lg text-left w-9/10' htmlFor='second'>
        STEP {step}
      </label>
      {error && (
        <h3 className='text-xs md:text-sm text-rose-700 absolute top-2/7'>
          {error}
        </h3>
      )}
      <input
        className='w-9/10 h-11 rounded-lg border shadow-sm px-3 py-2'
        type='email'
        placeholder='Enter email'
        name='email'
        id='second'
        value={email}
        onChange={onChange}
        required
      />
      <div className='inline-flex justify-between w-9/10'>
        <button
          className='h-11 w-1/2 rounded-lg border border-button-blue text-button-blue mr-2'
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          className='h-11 w-1/2 rounded-lg border-none bg-button-blue text-white'
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const { error, resetPassword } = useUser();
  const [values, setValues] = useState(initialValue);
  const [step, setStep] = useState(1);

  const { displayName, email } = values;

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setStep((curr) => curr + 1);
  };

  const handlePrev = () => {
    setStep((curr) => curr - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues(initialValue);
    resetPassword(values);
  };

  return (
    <section className='h-9/10'>
      <h1 className='sr-only'>Find your password</h1>
      <div className='h-full flex items-center justify-center'>
        <div className='max-w-xs md:max-w-md w-full rounded-lg shadow-lg p-3 md:p-6 bg-white'>
          <form
            className='flex flex-col items-center justify-center h-80'
            onSubmit={handleSubmit}
          >
            <h2 className='text-xl font-bold'>パスワード再設定</h2>
            {step === 1 && (
              <FirstStep
                step={step}
                error={error}
                displayName={displayName}
                onChange={handleChange}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <SecondStep
                step={step}
                error={error}
                email={email}
                onChange={handleChange}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
