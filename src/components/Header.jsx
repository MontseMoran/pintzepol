import React from 'react';
import '../styles/components/Header.scss';

function Header() {
  return (
    <header id="inicio" className="hero">
      <video
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="image/video3.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      <div className="hero__overlay" />

      <div className="hero__inner">
        <div className="hero__brand">
          <img src="image/logo.svg" alt="Logo Pintzepol" className="hero__logo" />
        </div>

        <div className="hero__stage">
          <div className="hero__panel">
            <h1>Recubrimientos industriales de alta calidad</h1>
            <p className="hero__copy">
              Mas de 40 anos de experiencia aplicando pintura liquida y pintura en polvo
              para obtener acabados resistentes, uniformes y duraderos.
            </p>
            <a href="#contacto" className="hero__cta">
              Solicita presupuesto
            </a>

            <a href="#servicios" className="hero__scroll" aria-label="Ir a servicios">
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
