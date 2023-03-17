import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

function AddPlacePopup({
  popupConfig,
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
    <PopupWithForm
      popupConfig={popupConfig}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
      isButtonSubmitLock={!isValid}
    >
      <fieldset className="form__container">
        {popupConfig.inputs.map(({ id, ...input }) => (
          <Input
            key={id}
            inputConfig={input}
            value={values[input.name]}
            onChange={handleChange}
            inputError={errors[input.name]}
          />
        ))}
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
