import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

function EditAvatarPopup({
  popupConfig,
  isOpen,
  onClose,
  onUpdateAvatar,
  onValidity,
  buttonSubmitState,
  inputErrors,
}) {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  useEffect(() => {
    setValues({ avatar: '' });
  }, [isOpen]);

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

export default EditAvatarPopup;
