import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ROOT_URL } from '../utils/settings';
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
          <Link to={ROOT_URL}>
            <img className="logo" src={logo} alt="логотип" />
          </Link>
          {loggedIn && (
            <button
              className="header__burger"
              onClick={handelBtnBurgerClick}
              type="button"
              aria-label="управление панелью выхода"
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
            path={ROOT_URL}
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
            path={`${ROOT_URL}sign-in`}
            element={
              <Link to={`${ROOT_URL}sign-up`} className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path={`${ROOT_URL}sign-up`}
            element={
              <Link to={`${ROOT_URL}sign-in`} className="header__link">
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
