import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useResetPassword from '../../hooks/Auth/useResetPassword';
import SectionForm from '../../components/form/SectionForm';
import AuthForm from '../../components/form/AuthForm';
import InputForm from '../../components/form/InputForm';
import Button from '../../components/ui/Button';

function FirstStep({ displayName, onChange, onNext }) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-evenly h-5/6 w-full'>
      <InputForm
        type={'text'}
        name={'displayName'}
        placeholder={'Enter username'}
        value={displayName}
        onChange={onChange}
      />
      <div className='inline-flex justify-center space-x-2 mt-4 w-9/10'>
        <Button
          color={'sub-blue'}
          type={'button'}
          title={'Go Back'}
          onClick={() => navigate(-1)}
        />
        <Button
          color={'blue'}
          type={'button'}
          title={'Next'}
          onClick={onNext}
        />
      </div>
    </div>
  );
}

function SecondStep({ email, onChange, onPrev, onSubmit }) {
  return (
    <div className='flex flex-col items-center justify-evenly h-5/6 w-full'>
      <InputForm
        type={'email'}
        name={'email'}
        placeholder={'Enter email'}
        value={email}
        onChange={onChange}
      />
      <div className='inline-flex justify-center space-x-2 mt-4 w-9/10'>
        <Button
          color={'sub-blue'}
          type={'button'}
          title={'Next'}
          onClick={onPrev}
        />
        <Button
          color={'blue'}
          type={'submit'}
          title={'Submit'}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const { values, isLoading, error, handleChange, handleSubmit } =
    useResetPassword();
  const { displayName, email } = values;

  const handleNext = () => {
    if (displayName !== '') setStep((curr) => curr + 1);
  };

  const handlePrev = () => {
    setStep((curr) => curr - 1);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionForm
          srTitle={'パスワード再設定'}
          title={'パスワード再設定'}
          step={step}
          error={error}
        >
          <AuthForm onSubmit={handleSubmit}>
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
          </AuthForm>
        </SectionForm>
      )}
      ;
    </>
  );
}
