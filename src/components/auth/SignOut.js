import React from 'react';

function SignOut({ isOpen, userData, onSignOut }) {
  return (
    <div className={`logout ${isOpen && 'logout_type_burger'}`}>
      <h3 className="logout__title">{userData.email}</h3>
      <div className="logout__link" onClick={onSignOut}>
        Выйти
      </div>
    </div>
  );
}

export default SignOut;
