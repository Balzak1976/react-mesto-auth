import React from 'react';

function Form({
  formConfig: { name, btnTitleSaving, btnTitle, btnUnlocker },
  onSubmit,
  onValidity,
  buttonSubmitState,
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
        ${btnUnlocker && buttonSubmitState.disabled && 'form__submit_inactive'}
      `}
        name="submit"
        type="submit"
        disabled={btnUnlocker && buttonSubmitState.disabled}
      >
        {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
      </button>
    </form>
  );
}

export default Form;
