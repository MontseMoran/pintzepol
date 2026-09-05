import React from 'react';
import PaintLogo from './PaintLogo';
import '../styles/components/Header.scss';

function Header({
  videoRef,
  showBackground = true,
  showContent = true,
  onOpenServices,
  onOpenContact,
}) {
  return (
    <header id={showContent ? 'inicio' : undefined} className={`hero${!showContent ? ' hero--background' : ''}`}>
      {showBackground && (
        <>
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="image/video3.mp4" type="video/mp4" />
            Tu navegador no soporta vídeos HTML5.
          </video>

          <div className="hero__overlay" />
        </>
      )}

      {showContent && (
        <div className="hero__inner">
          <div className="hero__brand">
            <img src="image/logo.svg" alt="Logo Pintzepol" className="hero__logo hero__logo--static" />
            {videoRef && <PaintLogo videoRef={videoRef} />}
          </div>

          <div className="hero__stage">
            <div className="hero__panel">
              <h1>Recubrimientos industriales de alta calidad</h1>
              <p className="hero__copy">
                Más de 40 años de experiencia aplicando pintura líquida y pintura en polvo
                para obtener acabados resistentes, uniformes y duraderos.
              </p>
              <button type="button" className="hero__cta" onClick={onOpenContact}>
                Solicita presupuesto
              </button>

              <button
                type="button"
                className="hero__scroll"
                onClick={onOpenServices}
                aria-label="Abrir servicios"
              >
                <span>&darr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
