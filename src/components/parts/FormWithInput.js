import { useContext } from 'react';
import { ValidationContext } from '../../contexts/ValidationContext';
import Input from './Input';

function FormWithInput({ config, onSubmit, buttonSubmitState }) {
  const validation = useContext(ValidationContext);

  const [values, handleChange, errors, isValid] = validation;

  return (
    <form
      className={`form form_type_${config.name}`}
      name={config.name}
      onSubmit={onSubmit}
      noValidate
    >
      {config.inputs && (
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
      )}

      <button
        className={`form__submit form__submit_type_${config.name}
        ${!isValid && 'form__submit_inactive'}
      `}
        name="submit"
        type="submit"
        disabled={!isValid}
      >
        {buttonSubmitState ? config.btnTitleSaving : config.btnTitle}
      </button>
    </form>
  );
}

export default FormWithInput;
