import React from 'react';
import { Link } from 'react-router-dom'

function Logout() {
  return (
    <>
      <li>email@mail.com</li>
      <li>
        <Link to="/sign-in" className="auth-nav__link auth-nav__link_logout">
          Выйти
        </Link>
      </li>
    </>
  );
}

export default Logout;
