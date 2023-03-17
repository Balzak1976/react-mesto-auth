import React from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { ValidationContext } from '../../contexts/ValidationContext';
import FormWithInput from '../parts/FormWithInput';

function Login({ config, buttonSubmitState, onLogin }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) return;

    onLogin(values).then((data) => {
      if (data?.token) {
        setValues({ email: '', password: '' });
      }
    });
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
    </section>
  );
}

export default Login;
