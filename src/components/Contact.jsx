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

function Contact({
  isOpen,
  inline = false,
  onClose,
  mapsConsent = false,
  onAcceptMaps,
  title = 'CONTACTO',
  showMap = true,
  sectionId = 'contacto',
}) {
  if (!isOpen) {
    return null;
  }

  const details = (
    <>
      <p><strong>Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a></p>
      <p><strong>Teléfono:</strong> <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a></p>
      <p><strong>Dirección:</strong> {company.address}</p>
      <div className="contact-overlay__hours">
        <strong>Horario:</strong>
        {company.hours.map((item) => (
          <p key={item.days}>
            <span>{item.days}</span>
            <span>{item.time}</span>
          </p>
        ))}
      </div>
    </>
  );

  if (inline) {
    return (
      <section id={sectionId} className="contact-overlay__panel contact-overlay__panel--inline">
        <div className="contact-overlay__intro">
          <h2 id="contact-overlay-title">{title}</h2>
          <div className="contact-overlay__details">
            {details}
          </div>
          {showMap && <LocationMap mapsConsent={mapsConsent} onAcceptMaps={onAcceptMaps} />}
        </div>
        <figure className="contact-overlay__image" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}image/contacto.webp`} alt="" />
        </figure>
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
        <h2 id="contact-overlay-title">{title}</h2>
        {details}
        <figure className="contact-overlay__image" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}image/contacto.webp`} alt="" />
        </figure>
        {showMap && <LocationMap mapsConsent={mapsConsent} onAcceptMaps={onAcceptMaps} />}
      </section>
    </div>
  );
}

export default Contact;
