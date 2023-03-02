import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

const defaultAvatar = require('../images/avatar.jpg');

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-cover"
          onClick={onEditAvatar}
        >
          <div className="profile__avatar-icon"></div>
          <img
            className="profile__user-avatar"
            src={currentUser.avatar ?? defaultAvatar}
            alt="аватар"
          />
        </div>

        <article className="profile__info">
          <div className="profile__header">
            <h1 className="profile__user-name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
              type="button"
              aria-label="редактировать"
            ></button>
          </div>
          <p className="profile__user-about">{currentUser?.about}</p>
        </article>

        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="добавить"
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((props) => {
            return (
              <Card
                key={props._id}
                props={props}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
