import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  props: { name, link, likes, owner, _id: cardId },
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const isLiked = likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && 'card__like-button_active'
  }`;

  return (
    <li className="card__item">
      <article className="card">
        {isOwn && (
          <button
            className="card__del-button"
            onClick={() => onCardDelete({ cardId })}
            type="button"
            aria-label="удалить"
          ></button>
        )}
        <img
          className="card__image"
          onClick={onCardClick}
          src={link}
          alt={name}
        />
        <div className="card__body">
          <h2 className="card__title">{name}</h2>
          <div className="card__like">
            <button
              className={cardLikeButtonClassName}
              onClick={() => onCardLike({ isLiked, cardId })}
              type="button"
              aria-label="лайкнуть"
            ></button>
            <div className="card__like-number">
              {likes.length > 0 && likes.length}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
