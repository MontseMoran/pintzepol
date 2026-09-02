import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/components/ServicesOverlay.scss';

function ServicesOverlay({ isOpen, isDetailOpen, services, images, onClose, onSelectService }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef(null);
  const activeImage = images[activeImageIndex] ?? images[0];

  useEffect(() => {
    if (!isOpen || isDetailOpen) {
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
  }, [isOpen, isDetailOpen, onClose]);

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    ));
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="services-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-overlay-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className="services-overlay__panel"
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
              aria-label="Cerrar servicios"
            >
              Cerrar
            </button>

            <div className="services-overlay__layout">
              <section className="services-overlay__visual">
                <div className="services-overlay__main-image">
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

                <h2 id="services-overlay-title">SERVICIOS</h2>
              </section>

              <section className="services-overlay__content">
                <div className="services-overlay__list">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      className="services-overlay__service"
                      onClick={() => onSelectService(service)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 * (index + 1), ease: 'easeOut' }}
                    >
                      <span className="services-overlay__service-title">{service.title}</span>
                      <span className="services-overlay__service-icon" aria-hidden="true">+</span>
                    </motion.button>
                  ))}
                </div>

                <div className="services-overlay__detail-image">
                  <img src="image/maquinas.png" alt="Maquinaria y herramientas para tratamientos técnicos" />
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServicesOverlay;
