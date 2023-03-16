import { useState } from 'react';
import Form from '../parts/Form';

function Login({
  authConfig,
  onValidity,
  buttonSubmitState,
  inputErrors,
  onLogin,
}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      return;
    }

    onLogin(formValue).then((data) => {
      if (data?.token) {
        setFormValue({ email: '', password: '' });
      }
    });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">{authConfig.title}</h2>

      <Form formConfig={authConfig}
            onSubmit={onSubmit}
            buttonSubmitState={buttonSubmitState}
            onValidity={onValidity}
      >
        <fieldset className="form__container">
          <label className="form__field">
            <input
              value={formValue.email}
              onChange={handleChange}
              className="form__input form__input_type_auth"
              placeholder="Email"
              name="email"
              type="email"
              required
            />
            <span
              className={`form__input-error ${
                inputErrors?.email && 'form__input-error_active'
              }`}
            >
              {inputErrors?.email}
            </span>
          </label>
          <label className="form__field">
            <input
              value={formValue.password}
              onChange={handleChange}
              className="form__input form__input_type_auth"
              placeholder="Пароль"
              name="password"
              type="password"
              minLength="5"
              maxLength="12"
              required
            />
            <span
              className={`form__input-error ${
                inputErrors?.password && 'form__input-error_active'
              }`}
            >
              {inputErrors?.password}
            </span>
          </label>
        </fieldset>

      </Form>

      
    </section>
  );
}

export default Login;
