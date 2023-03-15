import React from 'react';
import Popup from './Popup';

function PopupWithForm({
  popupConfig: { name, title, btnTitleSaving, btnTitle, btnUnlocker },
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
  onValidity,
  children,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className="popup__title">{title}</h2>

      <form
        className={`form form_type_${name}`}
        name={name}
        onSubmit={onSubmit}
        onChange={onValidity}
        noValidate
      >
        {children}

        <button
          className={`form__submit ${
            btnUnlocker && buttonSubmitState.disabled && 'form__submit_inactive'
          }`}
          name="submit"
          type="submit"
          disabled={btnUnlocker && buttonSubmitState.disabled}
        >
          {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
        </button>
      </form>

    </Popup>
  );
}

export default PopupWithForm;
