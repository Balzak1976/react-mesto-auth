import React from 'react';
import Popup from '../parts/Popup';

function InfoTooltip({
  config: { name, success, fail },
  info,
  isOpen,
  onClose,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="info">
        <div
          className={`info__img info__img_type_${
            info.isSuccess ? 'success' : 'fail'
          }`}
        ></div>
        <div className="info__text">
          {info.isSuccess ? success.text : fail.text}
        </div>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
