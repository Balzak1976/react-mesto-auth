import React from 'react';

function Form({
  config: { name, btnTitleSaving, btnTitle, btnUnlocker },
  onSubmit,
  onValidity,
  buttonSubmitState,
  isButtonSubmitLock,
  children,
}) {
  return (
    <form className={`form form_type_${name}`}
      name={name}
      onSubmit={onSubmit}
      onChange={onValidity}
      noValidate
    >
      {children}

      <button className={`form__submit form__submit_type_${name}
        ${btnUnlocker && isButtonSubmitLock && 'form__submit_inactive'}
      `}
        name="submit"
        type="submit"
        disabled={btnUnlocker && isButtonSubmitLock}
      >
        {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
      </button>
    </form>
  );
}

export default Form;
