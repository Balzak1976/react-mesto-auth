import React from 'react';

function Login() {
  const inputErrors = { email: false, password: false };

  return (
    <section className="auth">
      <h2 className="auth__title">вход</h2>

      <form
        className={`form form_type_auth`}
        name={'login'}
        // onSubmit={onSubmit}
        // onChange={onValidity}
        noValidate
      >
        <fieldset className="form__container">
          <label className="form__field">
            <input
              // value={name}
              // onChange={e => setName(e.target.value)}
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
              // value={description}
              // onChange={e => setDescription(e.target.value)}
              className="form__input form__input_type_auth"
              placeholder="Пароль"
              name="password"
              type="password"
              minLength="95"
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

        <button className={`form__submit form__submit_type_auth`} name="submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
