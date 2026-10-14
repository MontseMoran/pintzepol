import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { finishGroups } from '../content/finishes';
import '../styles/components/FinishesModal.scss';

const specialCoatings = [
  { id: 'anti-calorico', name: 'Anti-calórico', icon: 'heat' },
  { id: 'hidrofugo', name: 'Hidrófugo', icon: 'drop' },
  { id: 'anti-graffiti', name: 'Anti-graffiti', icon: 'spray' },
  { id: 'alimentario', name: 'Alimentario', icon: 'food' },
  { id: 'ignifugo', name: 'Ignífugo', icon: 'flame' },
  { id: 'rayos-uv', name: 'Resistente a rayos UV', icon: 'sun' },
  { id: 'rilsan', name: 'Rilsan', icon: 'layers' },
  { id: 'antideslizante', name: 'Antideslizante', icon: 'grip' },
  { id: 'antidesgaste', name: 'Antidesgaste', icon: 'wear' },
  { id: 'anticorrosivo', name: 'Anticorrosivo', icon: 'shield' },
];

function SpecialCoatingIcon({ type }) {
  const commonProps = {
    width: 28,
    height: 28,
    viewBox: '0 0 28 28',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  switch (type) {
    case 'heat':
      return (
        <svg {...commonProps}>
          <path d="M11 5v11a4 4 0 1 0 6 0V5a3 3 0 0 0-6 0Z" />
          <path d="M14 19v-6" />
          <path d="M20 6c1.4 1.4 1.4 3.2 0 4.6" />
          <path d="M23 4c2.3 2.4 2.3 5.8 0 8.2" />
        </svg>
      );
    case 'drop':
      return (
        <svg {...commonProps}>
          <path d="M14 4s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" />
          <path d="M8 8 4 12" />
          <path d="M24 12 20 8" />
        </svg>
      );
    case 'spray':
      return (
        <svg {...commonProps}>
          <path d="M9 11h7v12H9z" />
          <path d="M11 7h3v4" />
          <path d="M8 7h8" />
          <path d="M19 8h5" />
          <path d="M20 12h4" />
          <path d="M19 16h3" />
        </svg>
      );
    case 'food':
      return (
        <svg {...commonProps}>
          <path d="M8 4v8" />
          <path d="M5 4v5a3 3 0 0 0 6 0V4" />
          <path d="M8 12v12" />
          <path d="M18 4v20" />
          <path d="M18 4c4 2.4 5 7.2 0 9.5" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...commonProps}>
          <path d="M14 25a7 7 0 0 0 7-7c0-4.5-3.7-7.1-5.4-11.8-.3 3.1-2.4 4.6-4.3 6.6A7.2 7.2 0 0 0 7 18a7 7 0 0 0 7 7Z" />
          <path d="M14 22a3.2 3.2 0 0 0 3.2-3.2c0-1.7-1.2-2.8-2.1-4.3-.2 1.4-1.1 2.1-2 3a3.4 3.4 0 0 0-1.3 2.4A2.9 2.9 0 0 0 14 22Z" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...commonProps}>
          <path d="M14 9a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
          <path d="M14 3v3" />
          <path d="M14 22v3" />
          <path d="M3 14h3" />
          <path d="M22 14h3" />
          <path d="m6.2 6.2 2.1 2.1" />
          <path d="m19.7 19.7 2.1 2.1" />
          <path d="m21.8 6.2-2.1 2.1" />
          <path d="m8.3 19.7-2.1 2.1" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...commonProps}>
          <path d="m14 4 10 5-10 5L4 9l10-5Z" />
          <path d="m4 14 10 5 10-5" />
          <path d="m4 19 10 5 10-5" />
        </svg>
      );
    case 'grip':
      return (
        <svg {...commonProps}>
          <path d="M5 20h18" />
          <path d="M7 16h14" />
          <path d="m9 12 3 3" />
          <path d="m15 12 3 3" />
          <path d="M7 23h2" />
          <path d="M13 23h2" />
          <path d="M19 23h2" />
        </svg>
      );
    case 'wear':
      return (
        <svg {...commonProps}>
          <path d="M14 4 23 8v6c0 5.7-3.7 9.1-9 11-5.3-1.9-9-5.3-9-11V8l9-4Z" />
          <path d="M10 16h8" />
          <path d="M12 12h6" />
          <path d="M10 20h4" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M14 4 23 8v6c0 5.7-3.7 9.1-9 11-5.3-1.9-9-5.3-9-11V8l9-4Z" />
          <path d="M10 15h8" />
          <path d="m11 19 6-8" />
        </svg>
      );
  }
}

export function SpecialCoatingsPanel({ onBack }) {
  return (
    <section className="service-finishes-panel service-finishes-panel--special" aria-labelledby="special-coatings-panel-title">
      <button
        type="button"
        className="service-finishes-panel__back"
        onClick={onBack}
      >
        ← VOLVER
      </button>

      <header className="service-finishes-panel__header">
        <h3 id="special-coatings-panel-title" className="service-finishes-panel__title">
          RECUBRIMIENTOS ESPECIALES
        </h3>
      </header>

      <div className="service-finishes-panel__grid service-finishes-panel__grid--special">
        {specialCoatings.map((coating) => (
          <figure className="service-finishes-panel__item" key={coating.id}>
            <span className="service-finishes-panel__sample service-finishes-panel__sample--special" aria-hidden="true">
              <span className="service-finishes-panel__icon">
                <SpecialCoatingIcon type={coating.icon} />
              </span>
            </span>
            <figcaption className="service-finishes-panel__label">{coating.name}</figcaption>
          </figure>
        ))}
      </div>

      <p className="service-finishes-panel__copy">
        Soluciones de recubrimiento con propiedades específicas para aplicaciones exigentes.
      </p>
    </section>
  );
}

export function SpecialCoatingsModal({ onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="finishes-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="special-coatings-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <motion.div
          className="finishes-modal__card"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="finishes-modal__header">
            <div>
              <h2 id="special-coatings-modal-title" className="finishes-modal__title">
                RECUBRIMIENTOS ESPECIALES
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="finishes-modal__close"
              onClick={onClose}
              aria-label="Cerrar recubrimientos especiales"
            >
              ×
            </button>
          </header>

          <div className="finishes-modal__options finishes-modal__options--special">
            {specialCoatings.map((coating) => (
              <figure className="finishes-modal__option" key={coating.id}>
                <span className="finishes-modal__sample finishes-modal__sample--special" aria-hidden="true">
                  <span className="finishes-modal__icon">
                    <SpecialCoatingIcon type={coating.icon} />
                  </span>
                </span>
                <figcaption>{coating.name}</figcaption>
              </figure>
            ))}
          </div>

          <p className="finishes-modal__copy">
            Soluciones de recubrimiento con propiedades específicas para aplicaciones exigentes.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

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
