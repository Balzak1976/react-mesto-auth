import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ValidationContext } from '../../contexts/ValidationContext';
import PopupWithForm from '../parts/PopupWithForm';

function EditProfilePopup({
  config,
  isOpen,
  onClose,
  onUpdateUser,
  buttonSubmitState,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  useEffect(() => {
    resetForm();
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

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

export default EditProfilePopup;
