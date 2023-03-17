import React from 'react';

function Form({
  config: { name, btnTitleSaving, btnTitle },
  onSubmit,
  onValidity,
  buttonSubmitState,
  isButtonSubmitLock,
  children,
}) {
  console.log('isButtonSubmitLock,: ', isButtonSubmitLock);

  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      onSubmit={onSubmit}
      onChange={onValidity}
      noValidate
    >
      {children}

      <button
        className={`form__submit form__submit_type_${name}
        ${isButtonSubmitLock && 'form__submit_inactive'}
      `}
        name="submit"
        type="submit"
        disabled={isButtonSubmitLock}
      >
        {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
      </button>
    </form>
  );
}

export default Form;
