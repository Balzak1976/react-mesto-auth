import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';
import LogoutMenu from './auth/LogoutMenu';
import ProtectedRouteElement from './ProtectedRoute';

function Header({ loggedIn, userData, handleLogout }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handelBtnBurgerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    handleLogout();
    //закрываем меню, чтобы не ломало верстку
    setMenuOpen(false);
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
              className={`header__btn-burger${isMenuOpen ? '_is_close' : ''}`}
              onClick={handelBtnBurgerClick}
            />
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={LogoutMenu}
                loggedIn={loggedIn}
                isOpen={isMenuOpen}
                userData={userData}
                logout={logout}
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
