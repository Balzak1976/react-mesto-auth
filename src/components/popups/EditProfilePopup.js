import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function EditProfilePopup({
  popupConfig,
  isOpen,
  onClose,
  onUpdateUser,
  onValidity,
  buttonSubmitState,
  inputErrors,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  const enableValidation = () => {
    if (isValid) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: e.target.validationMessage,
      });
      setBtnSubmitState((s) => ({ ...s, disabled: true }));
    } else {
      setValidationErrors({});
      setBtnSubmitState((s) => ({ ...s, disabled: false }));
    }
  };
  
  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      popupConfig={popupConfig}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
      onValidity={onValidity}
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
