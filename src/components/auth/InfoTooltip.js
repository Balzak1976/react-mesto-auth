import React from 'react';

function InfoTooltip({ infoConfig: { success, fail }, info, isOpen, onClose }) {
  return (
    <section className={`popup  ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
          aria-label="закрыть"
        ></button>
        <div className="info">
          <div
            className={`info__img info__img_type_${
              info.isSuccess ? 'success' : 'fail'
            }`}
          ></div>
          <div className="info__text">
            {info.isSuccess ? success.text : info?.fail || fail.text}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
