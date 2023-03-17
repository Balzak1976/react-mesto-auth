import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';
import { authConfig, infoConfig, popupConfig } from '../utils/settings';
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
  const [btnSubmitState, setBtnSubmitState] = useState({
    isSaving: false,
    disabled: true,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [infoToolTip, setInfoToolTip] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState({});

  // =========================== AUTH =======================================

  const navigate = useNavigate();

  const handleRegister = ({ email, password }) => {
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));

    auth
      .register(email, password)
      .then(() => {
        navigate('/sign-in', { replace: true });
        setInfoToolTip({ isSuccess: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTip({ isSuccess: false });
      })
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
        setInfoToolTipOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));

    return auth
      .authorize(email, password)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
          // очищаем форму в Login.js
          return data;
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
      });
  };

  const handleTokenCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then(({ data }) => {
        if (data) {
          setEmail({ email: data.email });
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
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
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));
    api
      .addPlace({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
      });
  };

  const handleCardDelete = ({ cardId }) => {
    setBtnSubmitState((s) => ({ ...s, isSaving: true }));
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState((s) => ({ ...s, isSaving: false }));
      });
  };

  // ============================ CARDS =======================================

  const handleCardLike = ({ cardId, isLiked }) => {
    api
      .changeLikeCardStatus(cardId, isLiked)
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

      api
        .createQueueFetch()
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setCards(dataCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // ================================ VALIDATION ===============================

  const enableValidation = (e) => {
    if (!e.currentTarget.checkValidity()) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: e.target.validationMessage,
      });
      setBtnSubmitState((s) => ({ ...s, disabled: true }));
    } else {
      setValidationErrors({});
      setBtnSubmitState((s) => ({ ...s, disabled: false }));
    }
  };

  useEffect(() => {
    setValidationErrors({});
    setBtnSubmitState((s) => ({ ...s, disabled: true }));
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

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
                path="/"
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
                path="/sign-in"
                element={
                  <Login
                    authConfig={authConfig.login}
                    onValidity={enableValidation}
                    buttonSubmitState={btnSubmitState}
                    inputErrors={validationErrors}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={
                  <Register
                    authConfig={authConfig.register}
                    onValidity={enableValidation}
                    buttonSubmitState={btnSubmitState}
                    inputErrors={validationErrors}
                    onRegister={handleRegister}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
          
            <EditAvatarPopup
              popupConfig={popupConfig.avatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              onValidity={enableValidation}
              buttonSubmitState={btnSubmitState}
              inputErrors={validationErrors}
            />

            <EditProfilePopup
              popupConfig={popupConfig.profile}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              buttonSubmitState={btnSubmitState}
            />

            <AddPlacePopup
              popupConfig={popupConfig.card}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              onValidity={enableValidation}
              buttonSubmitState={btnSubmitState}
              inputErrors={validationErrors}
            />

            <DeleteCardPopup
              popupConfig={popupConfig.delCard}
              isOpen={isDelCardPopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
              buttonSubmitState={btnSubmitState}
            />

            <ImagePopup
              popupConfig={popupConfig.image}
              card={selectedCard}
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
            />

            <InfoTooltip
              infoConfig={infoConfig}
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
