import React, { useState } from 'react';
import useUser from '../hooks/useUser';

const initialValue = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function FirstStep({ step, displayName, onChange, onNext }) {
  return (
    <div>
      <label htmlFor='first'>STEP{step}: ユーザー名</label>
      <input
        type='text'
        placeholder='Enter username'
        name='displayName'
        id='first'
        value={displayName}
        onChange={onChange}
        required
      />
      <button onClick={onNext}>Next</button>
    </div>
  );
}

function SecondStep({ step, email, onChange, onPrev, onSubmit }) {
  return (
    <div>
      <label htmlFor='second'>STEP{step}: メールアドレス</label>
      <input
        type='email'
        placeholder='Enter email'
        name='email'
        id='second'
        value={email}
        onChange={onChange}
        required
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default function ForgotPassword() {
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
    <section>
      <h1 className='sr-only'>Find your password</h1>
      <form onSubmit={handleSubmit}>
        {error && <span>{error}</span>}
        {step === 1 && (
          <FirstStep
            step={step}
            displayName={displayName}
            onChange={handleChange}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <SecondStep
            step={step}
            email={email}
            onChange={handleChange}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
          />
        )}
      </form>
    </section>
  );
}
