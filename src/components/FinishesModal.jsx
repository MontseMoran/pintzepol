import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { finishGroups } from '../content/finishes';
import '../styles/components/FinishesModal.scss';

export function FinishesPanel({ serviceId, onBack, closeButtonRef, closeLabel = 'Cerrar acabados', closeText = '×' }) {
  const finishGroup = serviceId ? finishGroups[serviceId] : null;
  const subtitle = finishGroup?.title?.replace(/^ACABADOS\s*/, '') ?? '';

  if (!finishGroup) {
    return null;
  }

  return (
    <>
      <header className="finishes-modal__header">
        <div>
          <h2 id="finishes-modal-title" className="finishes-modal__title">
            ACABADOS
          </h2>
          <p className="finishes-modal__subtitle">{subtitle}</p>
        </div>

        {closeText === '×' && (
          <button
            ref={closeButtonRef}
            type="button"
            className="finishes-modal__close"
            onClick={onBack}
            aria-label={closeLabel}
          >
            {closeText}
          </button>
        )}
      </header>

      <div className="finishes-modal__options">
        {finishGroup.items.map((finish) => (
          <figure className="finishes-modal__option" key={finish.id ?? finish.name}>
            <span className={`finishes-modal__sample finishes-modal__sample--${finish.id}`} aria-hidden="true">
              {finish.image && (
                <img
                  className={`finishes-modal__image finishes-modal__image--${finish.id}`}
                  src={finish.image}
                  alt=""
                />
              )}
            </span>
            <figcaption>{finish.name}</figcaption>
          </figure>
        ))}
      </div>

      <p className="finishes-modal__copy">
        Una amplia variedad de acabados para adaptarnos a las necesidades estéticas de cada pieza.
      </p>

      {closeText !== '×' && (
        <button
          ref={closeButtonRef}
          type="button"
          className="finishes-modal__back"
          onClick={onBack}
        >
          {closeText}
        </button>
      )}
    </>
  );
}

export function ServiceFinishesPanel({ serviceId, onBack }) {
  const finishGroup = serviceId ? finishGroups[serviceId] : null;
  const subtitle = finishGroup?.title?.replace(/^ACABADOS\s*/, '') ?? '';

  if (!finishGroup) {
    return null;
  }

  return (
    <section className="service-finishes-panel" aria-labelledby="service-finishes-panel-title">
      <button
        type="button"
        className="service-finishes-panel__back"
        onClick={onBack}
      >
        ← VOLVER
      </button>

      <header className="service-finishes-panel__header">
        <h3 id="service-finishes-panel-title" className="service-finishes-panel__title">
          ACABADOS
        </h3>
        <p className="service-finishes-panel__subtitle">{subtitle}</p>
      </header>

      <div className="service-finishes-panel__grid">
        {finishGroup.items.map((finish) => (
          <figure className="service-finishes-panel__item" key={finish.id ?? finish.name}>
            <span className={`service-finishes-panel__sample service-finishes-panel__sample--${finish.id}`} aria-hidden="true">
              {finish.image && (
                <img
                  className={`service-finishes-panel__image service-finishes-panel__image--${finish.id}`}
                  src={finish.image}
                  alt=""
                />
              )}
            </span>
            <figcaption className="service-finishes-panel__label">{finish.name}</figcaption>
          </figure>
        ))}
      </div>

      <p className="service-finishes-panel__copy">
        Una amplia variedad de acabados para adaptarnos a las necesidades estéticas de cada pieza.
      </p>
    </section>
  );
}

function FinishesModal({ serviceId, onClose }) {
  const closeButtonRef = useRef(null);
  const finishGroup = serviceId ? finishGroups[serviceId] : null;
  const isOpen = Boolean(finishGroup);

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
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="finishes-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="finishes-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="finishes-modal__card"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <FinishesPanel
              serviceId={serviceId}
              onBack={onClose}
              closeButtonRef={closeButtonRef}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FinishesModal;
