import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import Logout from './auth/Logout';
import ProtectedRouteElement from './ProtectedRoute';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo header__logo" src={logo} alt="логотип" />
      </Link>
      <nav className="auth-nav">
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
              <Link to="/sign-up" className="auth-nav__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="auth-nav__link">
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
