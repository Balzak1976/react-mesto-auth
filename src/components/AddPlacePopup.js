import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  popupConfig,
  isOpen,
  onClose,
  onAddPlace,
  onValidity,
  buttonSubmitState,
  inputErrors,
}) {
  const nameRef = useRef();
  const linkRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
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
            ref={nameRef}
            className="form__input form__input_card_name"
            id="card-name-input"
            placeholder="Название"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
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
            ref={linkRef}
            className="form__input form__input_card_img-link"
            id="card-img-link-input"
            placeholder="Ссылка на картинку"
            name="link"
            type="url"
            required
          />
          <span
            className={`form__input-error ${
              inputErrors?.link && 'form__input-error_active'
            }`}
          >
            {inputErrors?.link}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
