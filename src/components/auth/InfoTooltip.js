import React from 'react';

function InfoTooltip({ infoToolTipConfig: { title }, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_type_info-tool-tip ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
          aria-label="закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
