import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({
  popupConfig,
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
      popupConfig={popupConfig}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
    />
  );
}

export default DeleteCardPopup;
