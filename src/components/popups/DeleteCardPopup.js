import React from 'react';
import { ValidationContext } from '../../contexts/ValidationContext';
import PopupWithForm from '../parts/PopupWithForm';

function DeleteCardPopup({
  config,
  isOpen: { isOpen, cardId },
  onClose,
  buttonSubmitState,
  onCardDelete,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(cardId);
  };
  // разблокировка кнопки удаления
  const isValid = true;

  return (
    <ValidationContext.Provider value={[isValid]}>
      <PopupWithForm
        config={config}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonSubmitState={buttonSubmitState}
      />
    </ValidationContext.Provider>
  );
}

export default DeleteCardPopup;
