import React from 'react';

function Input({
  inputConfig: {type, name, placeholder, typeAttribute, minLength, maxLength },
  value,
  onChange,
  inputError
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
        className={`form__input-error ${
          inputError && 'form__input-error_active'
        }`}
      >
        {inputError}
      </span>
    </label>
  );
}

export default Input;
