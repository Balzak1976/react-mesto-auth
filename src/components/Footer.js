import React from 'react';

function Footer() {
  const date = new Date();
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        &copy; {date.getFullYear()}. Максим Скороходов
      </p>
    </footer>
  );
}

export default Footer;
