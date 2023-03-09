import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import Logout from './auth/Logout';
import ProtectedRouteElement from './ProtectedRoute';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <nav className="header__menu">
        <Link to="/">
          <img className="logo" src={logo} alt="логотип" />
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement component={Logout} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
