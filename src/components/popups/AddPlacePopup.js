import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../parts/Input';

function AddPlacePopup({
  popupConfig,
  isOpen,
  onClose,
  onAddPlace,
  onValidity,
  buttonSubmitState,
  inputErrors,
}) {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  useEffect(() => {
    setValues({ name: '', link: '' });
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

export default AddPlacePopup;
