import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/components/ServiceDetailOverlay.scss';

function ServiceDetailOverlay({ service, images, lockScroll = true, onClose, onCloseAll, backLabel = '← SERVICIOS', copy }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [manualChangeCount, setManualChangeCount] = useState(0);
  const [isFinishesVisible, setIsFinishesVisible] = useState(false);
  const closeButtonRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isOpen = Boolean(service);
  const closeAll = onCloseAll ?? onClose;
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const powderImageSrc = `${import.meta.env.BASE_URL}image/polvo/Polvo1.webp`;
  const powderSecondImageSrc = `${import.meta.env.BASE_URL}image/polvo/Polvo2.webp`;
  const powderThirdImageSrc = `${import.meta.env.BASE_URL}image/polvo/Polvo3.webp`;
  const liquidImageSrc = `${import.meta.env.BASE_URL}image/liquido/Liquido1.webp`;
  const liquidSecondImageSrc = `${import.meta.env.BASE_URL}image/liquido/liquidocadena.webp`;
  const liquidThirdImageSrc = `${import.meta.env.BASE_URL}image/liquido/liquido2.webp`;
  const detailImages = service?.id === 'powder'
    ? [
      {
        ...images[0],
        id: 'polvo-1',
        src: powderImageSrc,
      },
      {
        ...images[1],
        id: 'polvo-2',
        src: powderSecondImageSrc,
      },
      {
        ...images[2],
        id: 'polvo-3',
        src: powderThirdImageSrc,
      },
      ...images.slice(3),
    ]
    : service?.id === 'liquid'
      ? [
        {
          ...images[0],
          id: 'liquido-1',
          src: liquidImageSrc,
        },
        {
          ...images[1],
          id: 'liquido-2',
          src: liquidSecondImageSrc,
        },
        {
          ...images[2],
          id: 'liquido-3',
          src: liquidThirdImageSrc,
        },
        ...images.slice(3),
      ]
      : images;
  const activeImage = detailImages[activeImageIndex] ?? detailImages[0];
  const getCircularImage = (index) => detailImages[
    (index + detailImages.length) % detailImages.length
  ];
  const coverflowImages = detailImages.length > 1
    ? [
      { image: getCircularImage(activeImageIndex - 1), position: 'previous' },
      { image: activeImage, position: 'active' },
      { image: getCircularImage(activeImageIndex + 1), position: 'next' },
    ]
    : activeImage ? [
      { image: activeImage, position: 'active' },
    ] : [];
  const coverflowVariants = prefersReducedMotion
    ? {
      previous: { x: '-50%', opacity: 1 },
      active: { x: '-50%', opacity: 1 },
      next: { x: '-50%', opacity: 1 },
    }
    : {
      previous: {
        left: '19%',
        top: '12px',
        height: 'calc(100% - 24px)',
        x: '-50%',
        scale: 0.92,
        opacity: 1,
        zIndex: 1,
        filter: 'brightness(0.92)',
        clipPath: 'inset(0 0 0 0)',
      },
      active: {
        left: '50%',
        top: '0px',
        height: '100%',
        x: '-50%',
        scale: 1,
        opacity: 1,
        zIndex: 3,
        filter: 'brightness(1)',
        clipPath: 'inset(0 0 0 0)',
      },
      next: {
        left: '81%',
        top: '12px',
        height: 'calc(100% - 24px)',
        x: '-50%',
        scale: 0.92,
        opacity: 1,
        zIndex: 1,
        filter: 'brightness(0.92)',
        clipPath: 'inset(0 0 0 0)',
      },
    };
  const entranceTransition = (delay = 0) => ({
    duration: prefersReducedMotion ? 0 : 0.18,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  });
  const entranceInitial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 };
  const entranceAnimate = { opacity: 1, y: 0 };
  const detailText = copy ?? (service?.id === 'powder'
    ? {
      title: 'PINTURA EN POLVO',
      technicalTitle: 'ACABADOS DE ALTA RESISTENCIA Y DURABILIDAD',
      description: 'Recubrimientos resistentes y duraderos que protegen y mejoran piezas industriales, garantizando uniformidad, calidad y fiabilidad a largo plazo.',
      summary: 'SOLUCIONES DE PINTADO Y TRATAMIENTO DE SUPERFICIES ADAPTADAS A LAS EXIGENCIAS DE CADA SECTOR INDUSTRIAL',
    }
    : service?.id === 'liquid'
      ? {
        title: 'PINTURA LÍQUIDA',
        technicalTitle: 'PINTURA LÍQUIDA DE ALTA PRECISIÓN',
        description: 'Aplicación de pintura líquida en piezas metálicas, plásticas y vítreas para obtener acabados uniformes, resistentes y de alta calidad.',
        summary: 'SOLUCIONES DE ACABADO ADAPTADAS A DIFERENTES MATERIALES Y APLICACIONES.',
      }
      : {
      title: service?.title?.toUpperCase(),
      technicalTitle: 'SISTEMAS DE PROTECCIÓN',
      description: 'Trabajamos con sistemas de pintado diseñados para cumplir con distintos niveles de protección anticorrosiva, incluyendo C3, C4, C4H, C5, C5H y C5M, adaptados a las condiciones ambientales y a los requisitos técnicos de cada aplicación.',
      summary: service?.summary,
    });

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
    setManualChangeCount(0);
    setIsCarouselPaused(false);
    setIsFinishesVisible(false);
  }, [service]);

  useEffect(() => {
    if (!isOpen || service?.id !== 'powder') {
      return undefined;
    }

    if (prefersReducedMotion) {
      setIsFinishesVisible(true);
      return undefined;
    }

    const revealTimer = window.setTimeout(() => {
      setIsFinishesVisible(true);
    }, 1400);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [isOpen, prefersReducedMotion, service]);

  useEffect(() => {
    if (!isOpen || isCarouselPaused || prefersReducedMotion || detailImages.length <= 1) {
      return undefined;
    }

    const autoplayTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (
        currentIndex === detailImages.length - 1 ? 0 : currentIndex + 1
      ));
    }, 3200);

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [detailImages.length, isCarouselPaused, isOpen, manualChangeCount, prefersReducedMotion]);

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === 0 ? detailImages.length - 1 : currentIndex - 1
    ));
    setManualChangeCount((current) => current + 1);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === detailImages.length - 1 ? 0 : currentIndex + 1
    ));
    setManualChangeCount((current) => current + 1);
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
            className="service-detail-overlay__shell"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="service-detail-overlay__controls">
              <button
                ref={closeButtonRef}
                type="button"
                className="service-detail-overlay__control"
                onClick={onClose}
                aria-label={backLabel.replace('← ', 'Volver a ')}
              >
                {backLabel}
              </button>
              <button
                type="button"
                className="service-detail-overlay__control"
                onClick={closeAll}
                aria-label="Cerrar detalle"
              >
                CERRAR
              </button>
            </div>

            <div className="service-detail-overlay__panel">
              <div className="service-detail-overlay__layout">
              <section className="service-detail-overlay__visual" aria-label="Imágenes del servicio">
                <motion.h2
                  id="service-detail-title"
                  initial={entranceInitial}
                  animate={entranceAnimate}
                  transition={entranceTransition(0.05)}
                >
                  {detailText.title}
                </motion.h2>
                <motion.div
                  className="service-detail-overlay__rule"
                  initial={entranceInitial}
                  animate={entranceAnimate}
                  transition={entranceTransition(0.1)}
                />

                <motion.div
                  className="service-detail-overlay__image-frame"
                  onMouseEnter={() => setIsCarouselPaused(true)}
                  onMouseLeave={() => setIsCarouselPaused(false)}
                  initial={entranceInitial}
                  animate={entranceAnimate}
                  transition={entranceTransition(0.1)}
                >
                  <AnimatePresence initial={false}>
                    {coverflowImages.map(({ image, position }) => (
                      <motion.div
                        key={image.id}
                        className={`service-detail-overlay__coverflow-item service-detail-overlay__coverflow-item--${position}`}
                        initial={prefersReducedMotion ? { opacity: 1 } : {
                          ...coverflowVariants[position],
                          clipPath: 'inset(0 30% 0 0)',
                        }}
                        animate={coverflowVariants[position]}
                        exit={prefersReducedMotion ? { opacity: 1 } : {
                          ...coverflowVariants[position],
                          clipPath: 'inset(0 0 0 30%)',
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.62,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={image.src === powderImageSrc ? 'service-detail-overlay__image--powder' : undefined}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {detailImages.length > 1 && (
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
                </motion.div>

                <div className="service-detail-overlay__dots" aria-hidden="true">
                  {detailImages.map((image, index) => (
                    <span
                      key={image.id}
                      className={`service-detail-overlay__dot${index === activeImageIndex ? ' is-active' : ''}`}
                    />
                  ))}
                </div>

                <p className="service-detail-overlay__summary">{detailText.summary}</p>
              </section>

              <aside className="service-detail-overlay__content">
                <motion.h3
                  initial={entranceInitial}
                  animate={entranceAnimate}
                  transition={entranceTransition(0.15)}
                >
                  {detailText.technicalTitle}
                </motion.h3>
                <motion.p
                  className="service-detail-overlay__description"
                  initial={entranceInitial}
                  animate={entranceAnimate}
                  transition={entranceTransition(0.2)}
                >
                  {detailText.description}
                </motion.p>
                {service?.id === 'powder' && (
                  <p className={`service-detail-overlay__finish-note${isFinishesVisible ? ' is-visible' : ''}`}>
                    Amplia variedad de acabados
                  </p>
                )}
              </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServiceDetailOverlay;
