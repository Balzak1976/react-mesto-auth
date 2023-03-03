import React from 'react';

function ImagePopup({ card: { cardLink, cardTitle }, isOpen, onClose }) {

  return (
    <section className={
      `popup popup_type_zoom-picture ${isOpen && 'popup_opened'}`
    }>
      <div className='popup__container popup__container_type_zoom-picture'>
        <button
          className='popup__close popup__close_type_zoom-picture'
          onClick={onClose}
          type='button'
          aria-label='закрыть'
        ></button>
        <figure className='zoom-picture'>
          <img
            className='zoom-picture__image'
            src={cardLink}
            alt={cardTitle}
          />
          <figcaption className='zoom-picture__caption'>
            {cardTitle}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
