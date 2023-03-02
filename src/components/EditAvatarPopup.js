import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  popupConfig,
  isOpen,
  onClose,
  onUpdateAvatar,
  onValidity,
  buttonSubmitState,
  inputErrors,
}) {
  const avatarRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

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
            ref={avatarRef}
            className="form__input form__input_avatar_img-link"
            id="avatar-img-link-input"
            placeholder="Ссылка на картинку"
            name="avatar"
            type="url"
            required
          />
          <span
            className={`form__input-error ${
              inputErrors?.avatar && 'form__input-error_active'
            }`}
          >
            {inputErrors?.avatar}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
