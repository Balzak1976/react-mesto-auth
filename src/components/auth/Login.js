import React from 'react';
import useForm from '../../hooks/useForm';
import Form from '../parts/Form';
import Input from '../parts/Input';

function Login({
  authConfig,
  onValidity,
  buttonSubmitState,
  inputErrors,
  onLogin,
}) {
  const { values, handleChange, setValues } = useForm({});

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
    </section>
  );
}

export default Login;
