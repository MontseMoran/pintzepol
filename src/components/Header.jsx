import React from 'react';
import '../styles/components/Header.scss';

function Header() {
  return (
    <header>
      <video autoPlay loop muted playsInline>
        <source src="/image/video3.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      <div className="overlay"></div>

      <div className="content">
        <img src="/image/logo.svg" alt="Logo Pintzepol" className="header__logo" />
        <h1>Recubrimientos industriales de calidad</h1>
        <a href="#contacto" className="btn">
          Solicitar presupuesto
        </a>
      </div>
    </header>
  );
}

export default Header;
