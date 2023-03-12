import React from 'react';

function LogoutMenu({ isOpen, userData, logout }) {
  return (
    <div className={`logout ${isOpen && 'logout_type_burger'}`}>
      <h3 className="logout__title">{userData.email}</h3>
      <div className="logout__link" onClick={logout}>
        Выйти
      </div>
    </div>
  );
}

export default LogoutMenu;
