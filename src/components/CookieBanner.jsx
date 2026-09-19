import React from 'react';
import '../styles/components/CookieBanner.scss';

function CookieBanner({ isVisible, onOpenCookies, onAcceptNecessary, onAcceptMaps }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies" aria-describedby="cookie-banner-text">
      <p id="cookie-banner-text">
        Utilizamos cookies técnicas necesarias para el funcionamiento de la web.
        El mapa de ubicación usa cookies de Google Maps y solo se carga si usted lo acepta.
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-banner__link"
          onClick={onOpenCookies}
        >
          Política de cookies
        </button>
        <button
          type="button"
          className="cookie-banner__secondary"
          onClick={onAcceptNecessary}
        >
          Solo necesarias
        </button>
        <button
          type="button"
          className="cookie-banner__accept"
          onClick={onAcceptMaps}
        >
          Aceptar mapa
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
