import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

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

export default EditAvatarPopup;
