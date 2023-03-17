import React from 'react';
import Popup from '../parts/Popup';

function ImagePopup({ config: { name }, card: { cardLink, cardTitle }, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <figure className="zoom-picture">
        <img className="zoom-picture__image" src={cardLink} alt={cardTitle} />
        <figcaption className="zoom-picture__caption">{cardTitle}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
