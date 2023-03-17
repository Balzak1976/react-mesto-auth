import React from 'react';
import Popup from './Popup';
import FormWithInput from '../parts/FormWithInput';

function PopupWithForm({
  config,
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={config.name}>
      <h2 className="popup__title">{config.title}</h2>

      <FormWithInput
        config={config}
        onSubmit={onSubmit}
        buttonSubmitState={buttonSubmitState}
      />
    </Popup>
  );
}

export default PopupWithForm;
