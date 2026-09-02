import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/components/ServiceDetailOverlay.scss';

function ServiceDetailOverlay({ service, images, lockScroll = true, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isOpen = Boolean(service);
  const activeImage = images[activeImageIndex] ?? images[0];

  useEffect(() => {
    if (!isOpen || !lockScroll) {
      return undefined;
    }

    const body = document.body;
    const originalBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    scrollPositionRef.current = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = originalBodyStyles.position;
      body.style.top = originalBodyStyles.top;
      body.style.left = originalBodyStyles.left;
      body.style.right = originalBodyStyles.right;
      body.style.width = originalBodyStyles.width;
      body.style.overflow = originalBodyStyles.overflow;
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen, lockScroll]);

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
    setActiveImageIndex(0);
  }, [service]);

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
          className="service-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            className="service-detail-overlay__panel"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="service-detail-overlay__close"
              onClick={onClose}
              aria-label="Volver a servicios"
            >
              Cerrar
            </button>

            <div className="service-detail-overlay__layout">
              <section className="service-detail-overlay__visual" aria-label="Imágenes del servicio">
                <h2 id="service-detail-title">{service.title.toUpperCase()}</h2>
                <div className="service-detail-overlay__rule" />

                <div className="service-detail-overlay__image-frame">
                  <img src={activeImage.src} alt={activeImage.alt} />

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="service-detail-overlay__image-nav service-detail-overlay__image-nav--previous"
                        onClick={showPreviousImage}
                        aria-label="Imagen anterior"
                      >
                        &lsaquo;
                      </button>
                      <button
                        type="button"
                        className="service-detail-overlay__image-nav service-detail-overlay__image-nav--next"
                        onClick={showNextImage}
                        aria-label="Imagen siguiente"
                      >
                        &rsaquo;
                      </button>
                    </>
                  )}
                </div>

                <div className="service-detail-overlay__dots" aria-hidden="true">
                  {images.map((image, index) => (
                    <span
                      key={image.id}
                      className={`service-detail-overlay__dot${index === activeImageIndex ? ' is-active' : ''}`}
                    />
                  ))}
                </div>

                <p className="service-detail-overlay__summary">{service.summary}</p>
              </section>

              <aside className="service-detail-overlay__content">
                <h3>{service.summary}</h3>
                <p className="service-detail-overlay__description">{service.description}</p>
                <button type="button" className="service-detail-overlay__more" aria-label="Más información">
                  +
                </button>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServiceDetailOverlay;
