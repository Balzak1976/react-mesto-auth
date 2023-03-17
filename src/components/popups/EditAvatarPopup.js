import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ValidationContext } from '../../contexts/ValidationContext';
import PopupWithForm from '../parts/PopupWithForm';

function EditAvatarPopup({
  config,
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonSubmitState,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  useEffect(() => {
    resetForm();
    setValues({ avatar: '' });
  }, [isOpen]);

  return (
    <ValidationContext.Provider value={[isValid, values, handleChange, errors]}>
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

export default EditAvatarPopup;
