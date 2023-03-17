import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ValidationContext } from '../../contexts/ValidationContext';
import PopupWithForm from '../parts/PopupWithForm';

function AddPlacePopup({
  config,
  isOpen,
  onClose,
  onAddPlace,
  buttonSubmitState,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  useEffect(() => {
    resetForm();
    setValues({ name: '', link: '' });
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

export default AddPlacePopup;
