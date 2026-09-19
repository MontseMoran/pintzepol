import React from 'react';
import { company } from '../content/company';
import '../styles/components/Contact.scss';

function LocationMap({ mapsConsent, onAcceptMaps }) {
  if (mapsConsent) {
    return (
      <div className="contact-overlay__map">
        <iframe
          title="Mapa de situación de PINTZEPOL en Rubí"
          src={company.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="contact-overlay__map contact-overlay__map--blocked">
      <p>
        El mapa de Google Maps solo se muestra si acepta las cookies de este servicio.
      </p>
      <div className="contact-overlay__map-actions">
        <button type="button" onClick={onAcceptMaps}>
          Mostrar mapa
        </button>
        <a href={company.mapsExternalUrl} target="_blank" rel="noopener noreferrer">
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
}

function Contact({ isOpen, inline = false, onClose, mapsConsent = false, onAcceptMaps }) {
  if (!isOpen) {
    return null;
  }

  const details = (
    <>
      <p><strong>Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a></p>
      <p><strong>Teléfono:</strong> <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a></p>
      <p><strong>Dirección:</strong> {company.address}</p>
    </>
  );

  if (inline) {
    return (
      <section id="contacto" className="contact-overlay__panel contact-overlay__panel--inline">
        <div className="contact-overlay__intro">
          <h2 id="contact-overlay-title">UBICACIÓN</h2>
          <div className="contact-overlay__details">
            {details}
          </div>
        </div>
        <LocationMap mapsConsent={mapsConsent} onAcceptMaps={onAcceptMaps} />
      </section>
    );
  }

  return (
    <div className="contact-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-overlay-title">
      <section id="contacto" className="contact-overlay__panel">
        <button
          type="button"
          className="contact-overlay__close"
          onClick={onClose}
          aria-label="Cerrar ubicación"
        >
          ×
        </button>
        <h2 id="contact-overlay-title">UBICACIÓN</h2>
        {details}
        <LocationMap mapsConsent={mapsConsent} onAcceptMaps={onAcceptMaps} />
      </section>
    </div>
  );
}

export default Contact;
