import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({
  authConfig: { formName, title, btnTitleSaving, btnTitle },
  buttonSubmitState,
  onValidity,
  inputErrors,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log(e.target);
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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

      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-up">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
