import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/components/Services.scss';
import ServiceDetailOverlay from './ServiceDetailOverlay';

export const showcaseImages = [
  {
    id: 'pulido',
    src: 'image/pulido1.png',
    alt: 'Proceso industrial de pulido',
  },
  {
    id: 'pintura',
    src: 'image/pintura1.png',
    alt: 'Proceso industrial de pintura',
  },
  {
    id: 'empaquetado',
    src: 'image/empaquetado.png',
    alt: 'Zona industrial de empaquetado',
  },
];

export const services = [
  {
    id: 'powder',
    title: 'Pintura en polvo',
    summary:
      'Recubrimiento electrostático para piezas metálicas con alta resistencia, uniformidad y durabilidad.',
    description:
      'Aplicamos pintura en polvo con control de proceso para conseguir un acabado técnico, estable y preparado para producción industrial continua.',
    mediaClass: 'services-showcase__image--powder',
  },
  {
    id: 'liquid',
    title: 'Pintura líquida',
    summary:
      'PINTURA LÍQUIDA DE ALTA PRECISIÓN',
    description:
      'Aplicación de pintura líquida en piezas metálicas, plásticas y vítreas para obtener acabados uniformes, resistentes y de alta calidad.',
    mediaClass: 'services-showcase__image--liquid',
  },
  {
    id: 'technical',
    title: 'Tratamientos técnicos',
    summary:
      'Preparación, desengrase y procesos previos para mejorar adherencia, protección y rendimiento final.',
    description:
      'Integramos tratamientos previos y operaciones técnicas para asegurar una base sólida antes del recubrimiento y elevar la calidad final.',
    mediaClass: 'services-showcase__image--technical',
  },
];

function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];
  const activeImage = showcaseImages[activeImageIndex];

  const goToPrevious = () => {
    const nextIndex = activeImageIndex === 0 ? showcaseImages.length - 1 : activeImageIndex - 1;
    setActiveImageIndex(nextIndex);
  };

  const goToNext = () => {
    const nextIndex = activeImageIndex === showcaseImages.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(nextIndex);
  };

  const openServiceDetails = (service) => {
    setSelectedService(service);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  const sectionViewport = { once: true, amount: 0.35 };

  const leftReveal = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  const rightReveal = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  const detailReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.46, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="servicios"
      className="services-showcase"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      <div className="services-showcase__shell">
        <motion.div
          className="services-showcase__left"
          variants={leftReveal}
        >
          <div className={`services-showcase__image services-showcase__image--lead ${activeService.mediaClass}`}>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="services-showcase__photo"
            />
            <button
              type="button"
              className="services-showcase__nav services-showcase__nav--prev"
              aria-label="Servicio anterior"
              onClick={goToPrevious}
            >
              &lsaquo;
            </button>
            <button
              type="button"
              className="services-showcase__nav services-showcase__nav--next"
              aria-label="Servicio siguiente"
              onClick={goToNext}
            >
              &rsaquo;
            </button>
          </div>

          <div className="services-showcase__dots" aria-hidden="true">
            {showcaseImages.map((image, index) => (
              <span
                key={image.id}
                className={`services-showcase__dot${index === activeImageIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>

          <div className="services-showcase__heading">
            <h2>SERVICIOS</h2>
          </div>
        </motion.div>

        <motion.div
          className="services-showcase__right"
          variants={rightReveal}
        >
          <motion.div
            className="services-showcase__accordion"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.18,
                },
              },
            }}
          >
            {services.map((service) => {
              const isActive = service.id === activeId;

              return (
                <motion.div
                  key={service.id}
                  className={`services-showcase__item${isActive ? ' is-active' : ''}`}
                  variants={{
                    hidden: { opacity: 0, x: 36 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.7, ease: 'easeOut' },
                    },
                  }}
                >
                  <button
                    type="button"
                    className="services-showcase__trigger"
                    aria-expanded={isActive}
                    onClick={() => setActiveId(service.id)}
                  >
                    <span>{service.title}</span>
                    <span className="services-showcase__icon">+</span>
                  </button>

                  {isActive && (
                    <div className="services-showcase__mobile-panel">
                      <p>{service.summary}</p>
                      <a
                        href="#servicios"
                        className="services-showcase__link"
                        onClick={(event) => {
                          event.preventDefault();
                          openServiceDetails(service);
                        }}
                      >
                        Ver más
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="services-showcase__detail"
            variants={detailReveal}
          >
            <div className={`services-showcase__image services-showcase__image--detail ${activeService.mediaClass}`}>
              <img
                src="image/maquinas.png"
                alt="Maquinaria y herramientas para tratamientos técnicos"
                className="services-showcase__photo"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ServiceDetailOverlay
        service={selectedService}
        images={showcaseImages}
        onClose={closeServiceDetails}
      />
    </motion.section>
  );
}

export default Services;
