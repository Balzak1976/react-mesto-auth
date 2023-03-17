import React from 'react';
import Form from '../parts/Form';
import Popup from '../parts/Popup';

function PopupWithForm({
  config,
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
  isButtonSubmitLock,
  children,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={config.name}>
      <h2 className="popup__title">{config.title}</h2>

      <Form
        config={config}
        onSubmit={onSubmit}
        buttonSubmitState={buttonSubmitState}
        isButtonSubmitLock={isButtonSubmitLock}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
