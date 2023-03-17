import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

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
    <PopupWithForm
      config={config}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
      isButtonSubmitLock={!isValid}
    >
      <fieldset className="form__container">
        {config.inputs.map(({ id, ...input }) => (
          <Input
            key={id}
            config={input}
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
