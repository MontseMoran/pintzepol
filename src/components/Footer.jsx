import React from 'react';
import '../styles/components/Footer.scss';

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 PINTZEPOL S.L.U.</p>
      <nav aria-label="Enlaces legales">
        <a href="#aviso-legal">Aviso legal</a>
        <span>·</span>
        <a href="#privacidad">Privacidad</a>
        <span>·</span>
        <a href="#cookies">Cookies</a>
      </nav>
    </footer>
  );
}

export default Footer;
