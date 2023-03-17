import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({
  config,
  isOpen: { isOpen, cardId },
  onClose,
  buttonSubmitState,
  onCardDelete,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    onCardDelete(cardId);
  };

  return (
    <PopupWithForm
      config={config}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
      isButtonSubmitLock={false}
    />
  );
}

export default DeleteCardPopup;
