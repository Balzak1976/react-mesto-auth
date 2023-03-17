import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

function EditProfilePopup({
  popupConfig,
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

export default EditProfilePopup;
