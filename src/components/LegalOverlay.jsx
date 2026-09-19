import React, { useEffect, useRef } from 'react';
import { legalDocuments, legalNav } from '../content/legalTexts';
import '../styles/components/LegalOverlay.scss';

function LegalOverlay({ documentId, onClose, onSelectDocument }) {
  const closeButtonRef = useRef(null);
  const panelRef = useRef(null);
  const legalDocument = legalDocuments[documentId];
  const isOpen = Boolean(legalDocument);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    closeButtonRef.current?.focus();
    panelRef.current?.scrollTo(0, 0);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, documentId, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="legal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-overlay-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section ref={panelRef} className="legal-overlay__panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="legal-overlay__close"
          onClick={onClose}
          aria-label="Cerrar texto legal"
        >
          ×
        </button>

        <nav className="legal-overlay__nav" aria-label="Textos legales">
          {legalNav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`legal-overlay__nav-item${item.id === documentId ? ' is-active' : ''}`}
              onClick={() => onSelectDocument(item.id)}
              aria-current={item.id === documentId ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <h2 id="legal-overlay-title">{legalDocument.title}</h2>
        <p className="legal-overlay__updated">Última actualización: {legalDocument.updated}</p>

        {legalDocument.sections.map((section) => (
          <article key={section.heading} className="legal-overlay__section">
            <h3>{section.heading}</h3>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.extraParagraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </section>
    </div>
  );
}

export default LegalOverlay;
