import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

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

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  };

  useEffect(() => {
    currentUser.name && setName(currentUser.name);
    currentUser.about && setDescription(currentUser.about);
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
        <label className="form__field">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="form__input form__input_user_name"
            id="user-name-input"
            placeholder="Имя"
            name="name"
            type="text"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className={`form__input-error ${
              inputErrors?.name && 'form__input-error_active'
            }`}
          >
            {inputErrors?.name}
          </span>
        </label>
        <label className="form__field">
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form__input form__input_user_about"
            id="user-about-input"
            placeholder="О себе"
            name="about"
            type="text"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className={`form__input-error ${
              inputErrors?.about && 'form__input-error_active'
            }`}
          >
            {inputErrors?.about}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
