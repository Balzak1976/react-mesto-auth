import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import Logout from './auth/Logout';
import ProtectedRouteElement from './ProtectedRoute';

function Header({ loggedIn }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handelBtnBurgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav
        className={`header__menu ${isMenuOpen && 'header__menu_type_burger'}`}
      >
        <div
          className={`header__panel ${
            isMenuOpen && 'header__panel_type_burger'
          }`}
        >
          <Link to="/">
            <img className="logo" src={logo} alt="логотип" />
          </Link>
          {loggedIn && (
            <div
              className={`header__btn-burger${isMenuOpen ? '_is_close':''}`}
              onClick={handelBtnBurgerClick}
            />
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={Logout}
                loggedIn={loggedIn}
                isOpen={isMenuOpen}
              />
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
