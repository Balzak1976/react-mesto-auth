import React from 'react';
import { Link } from 'react-router-dom';

function Logout({isOpen}) {
  return (
    <div className={`logout ${isOpen && 'logout_type_burger'}`}>
      <h3 className="logout__title">email@mail.com</h3>
      <Link to="/sign-in" className="logout__link">
        Выйти
      </Link>
    </div>
  );
}

export default Logout;
