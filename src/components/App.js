import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';
import { authConfig, infoConfig, popupConfig, ROOT_URL } from '../utils/settings';
import InfoTooltip from './auth/InfoTooltip';
import Login from './auth/Login';
import Register from './auth/Register';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ProtectedRouteElement from './parts/ProtectedRoute';
import AddPlacePopup from './popups/AddPlacePopup';
import DeleteCardPopup from './popups/DeleteCardPopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import EditProfilePopup from './popups/EditProfilePopup';
import ImagePopup from './popups/ImagePopup';

function App() {
  // ============================ STATES =======================================

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDelCardPopupOpen, setDelCardPopupOpen] = useState({ isOpen: false });
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isBtnSubmitSaving, setBtnSubmitSaving] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [infoToolTip, setInfoToolTip] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState({});

  // =========================== AUTH =======================================

  const navigate = useNavigate();

  const handleRegister = ({ email, password }) => {
    setBtnSubmitSaving(true);

    auth.register(email, password)
      .then(() => {
        navigate(`${ROOT_URL}sign-in`, { replace: true });
        setInfoToolTip({ isSuccess: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTip({ isSuccess: false });
      })
      .finally(() => {
        setBtnSubmitSaving(false);
        setInfoToolTipOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    setBtnSubmitSaving(true);

    return auth.authorize(email, password)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate(ROOT_URL, { replace: true });
          // очищаем форму в Login.js
          return data;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setBtnSubmitSaving(false);
      });
  };

  const handleTokenCheck = (jwt) => {
    auth.checkToken(jwt)
      .then(({ data }) => {
        if (data) {
          setEmail({ email: data.email });
          setLoggedIn(true);
          navigate(ROOT_URL, { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate(`${ROOT_URL}sign-in`, { replace: true });
    setLoggedIn(false);
  };

  // ============================ POPUPS =======================================

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleCardClick = (e) => {
    setSelectedCard({ cardLink: e.target.src, cardTitle: e.target.alt });
    setImagePopupOpen(true);
  };
  const handleCardDelBtnClick = (cardId) => {
    setDelCardPopupOpen({ isOpen: true, cardId });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDelCardPopupOpen({ isOpen: false });
    setImagePopupOpen(false);
    setInfoToolTipOpen(false);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setBtnSubmitSaving(true);

    api.setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitSaving(false);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setBtnSubmitSaving(true);

    api.setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitSaving(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setBtnSubmitSaving(true);

    api.addPlace({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitSaving(false);
      });
  };

  const handleCardDelete = ({ cardId }) => {
    setBtnSubmitSaving(true);

    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitSaving(false);
      });
  };

  // ============================ CARDS =======================================

  const handleCardLike = ({ cardId, isLiked }) => {
    api.changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ======================= Initial Profile, Cards ===========================

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      handleTokenCheck(jwt);

      api.createQueueFetch()
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setCards(dataCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // ===========================================================================

  return (
    <div className="root-app">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          
          <Header
            loggedIn={loggedIn}
            userData={email}
            onSignOut={handleSignOut}
          />

          <div className="wrapper">
            <Routes>
              <Route
                path={ROOT_URL}
                element={
                  <ProtectedRouteElement
                    component={Main}
                    loggedIn={loggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelBtnClick}
                  />
                }
              />
              <Route
                path={`${ROOT_URL}sign-in`}
                element={
                  <Login
                    config={authConfig.login}
                    buttonSubmitState={isBtnSubmitSaving}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path={`${ROOT_URL}sign-up`}
                element={
                  <Register
                    config={authConfig.register}
                    buttonSubmitState={isBtnSubmitSaving}
                    onRegister={handleRegister}
                  />
                }
              />
              <Route
                path='*'
                element={loggedIn ? <Navigate to={ROOT_URL} /> : <Navigate to={`${ROOT_URL}sign-in`} />}
              />
            </Routes>
          </div>
          
          <Footer />
          
            <EditAvatarPopup
              config={popupConfig.avatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              buttonSubmitState={isBtnSubmitSaving}
            />

            <EditProfilePopup
              config={popupConfig.profile}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonSubmitState={isBtnSubmitSaving}
            />

            <AddPlacePopup
              config={popupConfig.card}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              buttonSubmitState={isBtnSubmitSaving}
            />

            <DeleteCardPopup
              config={popupConfig.delCard}
              isOpen={isDelCardPopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
              buttonSubmitState={isBtnSubmitSaving}
            />

            <ImagePopup
              config={popupConfig.image}
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />

            <InfoTooltip
              config={infoConfig}
              info={infoToolTip}
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
            />
          
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
