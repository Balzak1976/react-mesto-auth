import React from 'react';
import Form from '../parts/Form';
import Popup from '../parts/Popup';

function PopupWithForm({
  popupConfig,
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
  isButtonSubmitLock,
  onValidity,
  children,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={popupConfig.name}>
      <h2 className="popup__title">{popupConfig.title}</h2>

      <Form
        formConfig={popupConfig}
        onSubmit={onSubmit}
        buttonSubmitState={buttonSubmitState}
        isButtonSubmitLock={isButtonSubmitLock}
        onValidity={onValidity}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
