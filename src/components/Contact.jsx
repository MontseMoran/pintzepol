import React from 'react';
import '../styles/components/Contact.scss';

function Contact({ isOpen, inline = false, onClose }) {
  if (!isOpen) {
    return null;
  }

  if (inline) {
    return (
      <section id="contacto" className="contact-overlay__panel contact-overlay__panel--inline">
        <h2 id="contact-overlay-title">CONTACTO</h2>
        <p><strong>Email:</strong> info@pintzepol.com</p>
        <p><strong>Teléfono:</strong> 936 99 01 20</p>
        <p><strong>Dirección:</strong> Carrer Sardana, 7-9 · 08191 Rubí · Barcelona · España</p>
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
          aria-label="Cerrar contacto"
        >
          ×
        </button>
        <h2 id="contact-overlay-title">CONTACTO</h2>
        <p><strong>Email:</strong> info@pintzepol.com</p>
        <p><strong>Teléfono:</strong> 936 99 01 20</p>
        <p><strong>Dirección:</strong> Carrer Sardana, 7-9 · 08191 Rubí · Barcelona · España</p>
      </section>
    </div>
  );
}

export default Contact;
