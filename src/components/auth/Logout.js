import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ isOpen, userData }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={`logout ${isOpen && 'logout_type_burger'}`}>
      <h3 className="logout__title">{userData.email }email@mail.com</h3>
      <div className="logout__link" onClick={signOut}>
        Выйти
      </div>
    </div>
  );
}

export default Logout;
