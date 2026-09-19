import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/components/ServicesOverlay.scss';

function JourneyOverlay({ isOpen, title, items, images, onClose, layout = 'default', onSelectItem }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [manualChangeCount, setManualChangeCount] = useState(0);
  const closeButtonRef = useRef(null);
  const activeImage = images[activeImageIndex] ?? images[0];
  const titleId = `${title.toLowerCase()}-overlay-title`;
  const isProcessLayout = layout === 'process';
  const midpoint = Math.ceil(items.length / 2);
  const processColumns = [items.slice(0, midpoint), items.slice(midpoint)];

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

  useEffect(() => {
    if (!isOpen || isProcessLayout || isCarouselPaused || images.length <= 1) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const autoplayTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      ));
    }, 3200);

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [images.length, isCarouselPaused, isOpen, isProcessLayout, manualChangeCount]);

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    ));
    setManualChangeCount((current) => current + 1);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    ));
    setManualChangeCount((current) => current + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="services-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className={`services-overlay__panel${isProcessLayout ? ' services-overlay__panel--process' : ''}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="services-overlay__close"
              onClick={onClose}
              aria-label={`Cerrar ${title.toLowerCase()}`}
            >
              Cerrar
            </button>

            <div className={`services-overlay__layout${isProcessLayout ? ' services-overlay__layout--process' : ''}`}>
              {isProcessLayout ? (
                <>
                  <h2 id={titleId}>{title}</h2>
                  <div className="services-overlay__process-grid">
                    {processColumns.map((columnItems, columnIndex) => (
                      <ul key={columnIndex} className="services-overlay__process-column">
                        {columnItems.map((item) => (
                          <li key={item.id} className="services-overlay__process-item">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </>
              ) : (
                <>
              <section className="services-overlay__visual">
                <div
                  className="services-overlay__main-image"
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                >
                  <img src={activeImage.src} alt={activeImage.alt} />
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="services-overlay__image-nav services-overlay__image-nav--previous"
                        onClick={showPreviousImage}
                        aria-label="Imagen anterior"
                      >
                        &lsaquo;
                      </button>
                      <button
                        type="button"
                        className="services-overlay__image-nav services-overlay__image-nav--next"
                        onClick={showNextImage}
                        aria-label="Imagen siguiente"
                      >
                        &rsaquo;
                      </button>
                    </>
                  )}
                </div>

                <div className="services-overlay__dots" aria-hidden="true">
                  {images.map((image, index) => (
                    <span
                      key={image.id}
                      className={`services-overlay__dot${index === activeImageIndex ? ' is-active' : ''}`}
                    />
                  ))}
                </div>

                <h2 id={titleId}>{title}</h2>
              </section>

              <section className="services-overlay__content">
                <div className="services-overlay__list">
                  {items.map((item) => {
                    if (onSelectItem) {
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="services-overlay__service"
                          onClick={() => onSelectItem(item)}
                        >
                          <span className="services-overlay__service-title">{item.title}</span>
                          <span className="services-overlay__service-icon" aria-hidden="true">→</span>
                        </button>
                      );
                    }

                    const isActive = item.id === activeId;

                    return (
                      <div key={item.id} className="services-overlay__item">
                        <button
                          type="button"
                          className="services-overlay__service"
                          aria-expanded={isActive}
                          onClick={() => setActiveId(item.id)}
                        >
                          <span className="services-overlay__service-title">{item.title}</span>
                          <span className="services-overlay__service-icon" aria-hidden="true">
                            {isActive ? '−' : '+'}
                          </span>
                        </button>
                        {isActive && item.description && (
                          <p className="services-overlay__item-copy">{item.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="services-overlay__detail-image">
                  <img src="image/maquinas.png" alt="Maquinaria y herramientas para tratamientos técnicos" />
                </div>
              </section>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default JourneyOverlay;
