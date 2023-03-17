import React from 'react';

function Input({
  config: { type, name, placeholder, typeAttribute, minLength, maxLength },
  value,
  onChange,
  error,
}) {
  return (
    <label className="form__field">
      <input
        value={value ?? ''}
        onChange={onChange}
        className={`form__input form__input_type_${type}`}
        placeholder={placeholder}
        name={name}
        type={typeAttribute}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span
        className={`form__input-error ${error && 'form__input-error_active'}`}
      >
        {error}
      </span>
    </label>
  );
}

export default Input;
