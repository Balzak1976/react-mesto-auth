import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';

function Login({
  authConfig: { formName, title, btnTitleSaving, btnTitle },
  buttonSubmitState,
  onValidity,
  inputErrors,
  handleLogin,
}) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then(data => {
        if (data.token) {
          setFormValue({ email: '', password: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>

      <form
        className={`form form_type_auth`}
        name={formName}
        onSubmit={onSubmit}
        onChange={onValidity}
        noValidate
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

        <button
          className={`form__submit form__submit_type_auth ${
            buttonSubmitState.disabled && 'form__submit_inactive'
          }`}
          name="submit"
          type="submit"
          disabled={buttonSubmitState.disabled}
        >
          {buttonSubmitState.isSaving ? btnTitleSaving : btnTitle}
        </button>
      </form>
    </section>
  );
}

export default Login;
