import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Form from '../parts/Form';
import Input from '../parts/Input';

function Register({
  authConfig,
  buttonSubmitState,
  onRegister,
}) {
  const { values, handleChange, errors, isValid } =
    useFormAndValidation();

  const onSubmit = (e) => {
    e.preventDefault();

    onRegister(values);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">{authConfig.title}</h2>

      <Form
        formConfig={authConfig}
        onSubmit={onSubmit}
        buttonSubmitState={buttonSubmitState}
        isButtonSubmitLock={!isValid}
      >
        <fieldset className="form__container">
          {authConfig.inputs.map(({ id, ...input }) => (
            <Input
              key={id}
              inputConfig={input}
              value={values[input.name]}
              onChange={handleChange}
              inputError={errors[input.name]}
            />
          ))}
        </fieldset>
      </Form>

      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
