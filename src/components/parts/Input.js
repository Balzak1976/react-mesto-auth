import React from 'react';

function Input({
  inputConfig: { name, placeholder, typeAttribute, minLength, maxLength },
  inputErrors
}) {
  return (
    <label className="form__field">
      <input
        // value={name}
        // onChange={(e) => setName(e.target.value)}
        className={`form__input form__input_type_${name}`}
        placeholder={placeholder}
        name={name}
        type={typeAttribute}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span
        className={`form__input-error ${
          inputErrors?.name && 'form__input-error_active'
        }`}
      >
        {inputErrors?.name}
      </span>
    </label>
  );
}

export default Input;
