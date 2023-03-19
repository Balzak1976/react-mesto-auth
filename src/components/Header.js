import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';
import SignOut from './auth/SignOut';
import ProtectedRouteElement from './parts/ProtectedRoute';

function Header({ loggedIn, userData, onSignOut }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handelBtnBurgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    onSignOut();
    //закрываем меню, чтобы не ломало верстку
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <nav
        className={`header__menu ${isMenuOpen && 'header__menu_type_burger'}`}
      >
        <div
          className={`header__panel
          ${isMenuOpen && 'header__panel_type_burger'}`}
        >
          <Link to="/">
            <img className="logo" src={logo} alt="логотип" />
          </Link>
          {loggedIn && (
            <button
              className="header__burger"
              onClick={handelBtnBurgerClick}
              type="button"
              aria-label="управление signout"
            >
              <span
                className={`header__burger-inner ${
                  isMenuOpen && 'header__burger-inner_active'
                }`}
              />
            </button>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={SignOut}
                loggedIn={loggedIn}
                isOpen={isMenuOpen}
                userData={userData}
                onSignOut={handleSignOut}
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
