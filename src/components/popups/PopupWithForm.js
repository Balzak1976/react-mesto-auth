import { useRef, useEffect } from 'react';

function PopupWithForm({
  popupConfig: {
    formName,
    title,
    btnTitleSaving,
    btnTitle,
    btnUnlocker,
  },
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
  onValidity,
  children,
}) {
  const formRef = useRef();

  useEffect(() => {
    // очищаем форму при открытии
    isOpen && formRef.current.reset();
  }, [isOpen]);

  return (
    <section
      className={`popup popup_type_${formName} ${
        isOpen && 'popup_opened'
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
          aria-label="закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>

        <form
          className={`form form_type_${formName}`}
          name={formName}
          onSubmit={onSubmit}
          onChange={onValidity}
          ref={formRef}
          noValidate
        >
          {children}

          <button
            className={`form__submit ${
            btnUnlocker &&  buttonSubmitState.disabled && 'form__submit_inactive'
            }`}
            name="submit"
            type="submit"
            disabled={btnUnlocker && buttonSubmitState.disabled}
          >
            {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
