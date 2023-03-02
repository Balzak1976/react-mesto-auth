import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import { popupConfig } from '../utils/settings';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';

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

  // ============================ POPUPS =======================================

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleCardClick = e => {
    setSelectedCard({ cardLink: e.target.src, cardTitle: e.target.alt });
    setImagePopupOpen(true);
  };
  const handleCardDelBtnClick = cardId => {
    setDelCardPopupOpen({ isOpen: true, cardId });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDelCardPopupOpen({ isOpen: false });
    setImagePopupOpen(false);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setBtnSubmitState(s => ({ ...s, isSaving: true }));
    api
      .setUserAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState(s => ({ ...s, isSaving: false }));
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setBtnSubmitState(s => ({ ...s, isSaving: true }));
    api
      .setUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState(s => ({ ...s, isSaving: false }));
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setBtnSubmitState(s => ({ ...s, isSaving: true }));
    api
      .addPlace({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState(s => ({ ...s, isSaving: false }));
      });
  };

  const handleCardDelete = ({ cardId }) => {
    setBtnSubmitState(s => ({ ...s, isSaving: true }));
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(state => state.filter(c => c._id !== cardId));

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setBtnSubmitState(s => ({ ...s, isSaving: false }));
      });
  };

  // ============================ CARDS =======================================

  const handleCardLike = ({ cardId, isLiked }) => {
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === cardId ? newCard : c)));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // ======================= Initial Profile, Cards ===========================

  useEffect(() => {
    api
      .createQueueFetch()
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // ================================ VALIDATION ===============================

  const enableValidation = e => {
    if (!e.currentTarget.checkValidity()) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: e.target.validationMessage,
      });
      setBtnSubmitState(s => ({ ...s, disabled: true }));
    } else {
      setValidationErrors({});
      setBtnSubmitState(s => ({ ...s, disabled: false }));
    }
  };

  useEffect(() => {
    setValidationErrors({});
    setBtnSubmitState(s => ({ ...s, disabled: true }));
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  // ===========================================================================

  return (
    <div className="root-app">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelBtnClick}
          />

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
            onValidity={enableValidation}
            buttonSubmitState={btnSubmitState}
            inputErrors={validationErrors}
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
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
