import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Form from '../parts/Form';
import Input from '../parts/Input';

function Register({
  authConfig,
  onValidity,
  buttonSubmitState,
  inputErrors,
  onRegister,
}) {
  const { values, handleChange } = useForm({});

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
        onValidity={onValidity}
      >
        <fieldset className="form__container">
          {authConfig.inputs.map(({ id, ...input }) => (
            <Input
              key={id}
              inputConfig={input}
              value={values[input.name]}
              onChange={handleChange}
              inputError={inputErrors[input.name]}
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
