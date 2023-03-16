import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

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

  const { values, handleChange, setValues } = useForm({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
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
            inputError={inputErrors[input.name]}
          />
        ))}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
