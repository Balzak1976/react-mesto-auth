import React from 'react';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../utils/settings';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ValidationContext } from '../../contexts/ValidationContext';
import FormWithInput from '../parts/FormWithInput';

function Register({ config, buttonSubmitState, onRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const onSubmit = (e) => {
    e.preventDefault();

    onRegister(values);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">{config.title}</h2>

      <ValidationContext.Provider
        value={[isValid, values, handleChange, errors]}
      >
        <FormWithInput
          config={config}
          onSubmit={onSubmit}
          buttonSubmitState={buttonSubmitState}
        />
      </ValidationContext.Provider>

      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to={`${ROOT_URL}sign-in`}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
