import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { services, showcaseImages } from './Services';
import { processSteps, sectors } from '../content/company';
import Contact from './Contact';
import { ServiceFinishesPanel } from './FinishesModal';
import FadeCarouselImage from './FadeCarouselImage';
import '../styles/components/HorizontalHome.scss';

const cardViewport = { once: true, amount: 0.32 };

function useCardReveal() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const still = {
      hidden: { opacity: 1, filter: 'none' },
      visible: { opacity: 1, filter: 'none' },
    };

    return { card: still };
  }

  return {
    card: {
      hidden: {
        opacity: 0,
        y: 28,
        scale: 0.985,
        filter: 'blur(12px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 1.15,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  };
}

function CoverflowFrame({
  images,
  activeImageIndex,
  onPrevious,
  onNext,
  onPause,
  onResume,
}) {
  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <div
      className="horizontal-detail__image-frame"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <FadeCarouselImage image={activeImage} />
      {images.length > 1 && (
        <>
          <button type="button" className="horizontal-detail__image-nav horizontal-detail__image-nav--previous" onClick={onPrevious} aria-label="Imagen anterior">
            &lsaquo;
          </button>
          <button type="button" className="horizontal-detail__image-nav horizontal-detail__image-nav--next" onClick={onNext} aria-label="Imagen siguiente">
            &rsaquo;
          </button>
        </>
      )}
    </div>
  );
}

const IMAGE_AUTOPLAY_MS = 3200;

function useImageCarousel(length) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [manualChangeCount, setManualChangeCount] = useState(0);

  useEffect(() => {
    if (length > 0 && activeImageIndex >= length) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, length]);

  useEffect(() => {
    if (length <= 1 || isPaused) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const autoplayTimer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (
        currentIndex === length - 1 ? 0 : currentIndex + 1
      ));
    }, IMAGE_AUTOPLAY_MS);

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [isPaused, length, manualChangeCount]);

  const showPreviousImage = () => {
    if (length <= 1) {
      return;
    }

    setActiveImageIndex((currentIndex) => (
      currentIndex === 0 ? length - 1 : currentIndex - 1
    ));
    setManualChangeCount((current) => current + 1);
  };

  const showNextImage = () => {
    if (length <= 1) {
      return;
    }

    setActiveImageIndex((currentIndex) => (
      currentIndex === length - 1 ? 0 : currentIndex + 1
    ));
    setManualChangeCount((current) => current + 1);
  };

  return {
    activeImageIndex,
    pauseCarousel: () => setIsPaused(true),
    resumeCarousel: () => setIsPaused(false),
    showPreviousImage,
    showNextImage,
  };
}

const detailCopy = {
  powder: {
    title: 'PINTURA EN POLVO',
    technicalTitle: 'RESISTENCIA Y CALIDAD EN CADA ACABADO',
    description: 'Recubrimientos en polvo que aportan protección, durabilidad y un acabado uniforme a todo tipo de piezas y componentes. Adaptamos cada proceso a las características de la pieza y a las exigencias de su aplicación.',
    summary: 'SOLUCIONES DE PINTURA Y RECUBRIMIENTO ADAPTADAS A LAS NECESIDADES DE CADA CLIENTE Y SECTOR INDUSTRIAL',
  },
  liquid: {
    title: 'PINTURA LÍQUIDA',
    technicalTitle: 'TRABAJOS DE PRECISIÓN PARA CADA PROYECTO',
    description: 'Trabajamos con diferentes sistemas de aplicación para conseguir el resultado estético y técnico que requiere cada componente, desde colores y texturas hasta efectos y acabados especiales.',
    summary: 'EXPERTOS EN APLICACIONES SOBRE SUPERFICIES METÁLICAS, PLÁSTICAS Y OTROS MATERIALES',
  },
  technical: {
    title: 'TRATAMIENTOS TÉCNICOS',
    technicalTitle: 'SOLUCIONES ESPECÍFICAS PARA TODO TIPO DE ENTORNO',
    description: 'Desarrollamos sistemas orientados a mejorar el comportamiento de los componentes frente a condiciones ambientales, corrosión y agentes externos, siguiendo los requisitos establecidos para cada proyecto.',
    summary: 'SISTEMAS C3, C4, C4H, C5, C5H Y C5M SEGÚN LAS CONDICIONES DE EXPOSICIÓN Y LAS EXIGENCIAS DEL PROYECTO.',
  },
};

const serviceImages = {
  powder: [
    { id: 'polvo-1', src: `${import.meta.env.BASE_URL}image/polvo/Polvo1.webp`, alt: 'Aplicación industrial de pintura en polvo' },
    { id: 'polvo-2', src: `${import.meta.env.BASE_URL}image/polvo/Polvo2.webp`, alt: 'Pieza metálica con recubrimiento en polvo' },
    { id: 'polvo-3', src: `${import.meta.env.BASE_URL}image/polvo/Polvo3.webp`, alt: 'Proceso de acabado en pintura en polvo' },
  ],
  liquid: [
    { id: 'liquido-1', src: `${import.meta.env.BASE_URL}image/liquido/CARRUSEL_PINTURA _LÍQUIDA.webp`, alt: 'Aplicación industrial de pintura líquida' },
    { id: 'liquido-2', src: `${import.meta.env.BASE_URL}image/liquido/CARRUSEL_PINTURA_LÍQUIDA_CADENA.webp`, alt: 'Línea de pintura líquida en proceso continuo' },
    { id: 'liquido-3', src: `${import.meta.env.BASE_URL}image/liquido/CARRUSEL _PINTURA_LÍQUIDA_VIDRIO.webp`, alt: 'Acabado de pintura líquida sobre pieza industrial' },
  ],
  technical: [
    { id: 'tecnico-1', src: `${import.meta.env.BASE_URL}image/TRAT/TRATAMIENTOS_TECNICOS_MICRAJE.webp`, alt: 'Control de micraje en tratamientos técnicos' },
    { id: 'tecnico-2', src: `${import.meta.env.BASE_URL}image/TRAT/TRATAMIENTOS_TECNICOS_PULIDORA.webp`, alt: 'Pulidora para tratamientos técnicos' },
    { id: 'tecnico-3', src: `${import.meta.env.BASE_URL}image/TRAT/TRATAMIENTOS_TÉCNICOS_ANTICORROSIVO.webp`, alt: 'Tratamiento anticorrosivo técnico' },
  ],
};

const sectorImages = [
  { id: 'sectores-1', src: `${import.meta.env.BASE_URL}image/SECTORES/CARRUSEL_SECTORES_PINTAR.webp`, alt: 'Pintado de piezas para sectores industriales' },
  { id: 'sectores-2', src: `${import.meta.env.BASE_URL}image/SECTORES/CARRUSEL_SECTORES_VASO.webp`, alt: 'Pieza con acabado técnico para sectores especializados' },
  { id: 'sectores-3', src: `${import.meta.env.BASE_URL}image/SECTORES/CARRUSEL_SECTORES.webp`, alt: 'Aplicación de pintura para distintos sectores' },
];

const sectorImagesById = {
  transporte: [
    { id: 'transporte-1', src: `${import.meta.env.BASE_URL}image/SECTORES/TRANSPORTE/TRANSPORTE_FERROVIARIO.webp`, alt: 'Pieza para transporte ferroviario' },
    { id: 'transporte-2', src: `${import.meta.env.BASE_URL}image/SECTORES/TRANSPORTE/TRANSPORTE_NAVAL.webp`, alt: 'Pieza para transporte naval' },
    { id: 'transporte-3', src: `${import.meta.env.BASE_URL}image/SECTORES/TRANSPORTE/TRANSPORTE_AUTOMOCIÓN.webp`, alt: 'Pieza para automoción' },
  ],
};

export const sectorDetailCopy = {
  transporte: {
    title: 'TRANSPORTE',
    technicalTitle: 'SOLUCIONES PARA UNA MOVILIDAD MÁS EXIGENTE',
    description: 'Participamos en proyectos de automoción, ferrocarril, naval y otras áreas vinculadas a la movilidad, atendiendo las particularidades de cada pieza y aplicación.',
    secondaryDescription: 'DESDE PEQUEÑOS ELEMENTOS HASTA ESTRUCTURAS DE GRAN FORMATO, TRABAJAMOS PARA DISTINTAS ÁREAS DE LA INDUSTRIA DE LA MOVILIDAD.',
    summary: 'APLICACIONES DIVERSAS, DESDE COMPONENTES HASTA ESTRUCTURAS.',
  },
  industria: {
    title: 'INDUSTRIA',
    technicalTitle: 'ACABADOS DE ALTA RESISTENCIA Y DURABILIDAD',
    description: 'Recubrimientos resistentes y duraderos que protegen y mejoran piezas industriales, garantizando uniformidad, calidad y fiabilidad a largo plazo.',
    summary: 'SOLUCIONES DE PINTADO Y TRATAMIENTO DE SUPERFICIES ADAPTADAS A LAS EXIGENCIAS DE CADA SECTOR INDUSTRIAL',
  },
  salud: {
    title: 'SALUD',
    technicalTitle: 'ACABADOS DE ALTA RESISTENCIA Y DURABILIDAD',
    description: 'Recubrimientos resistentes y duraderos que protegen y mejoran piezas industriales, garantizando uniformidad, calidad y fiabilidad a largo plazo.',
    summary: 'SOLUCIONES DE PINTADO Y TRATAMIENTO DE SUPERFICIES ADAPTADAS A LAS EXIGENCIAS DE CADA SECTOR INDUSTRIAL',
  },
  tecnologia: {
    title: 'TECNOLOGÍA',
    technicalTitle: 'ACABADOS DE ALTA RESISTENCIA Y DURABILIDAD',
    description: 'Recubrimientos resistentes y duraderos que protegen y mejoran piezas industriales, garantizando uniformidad, calidad y fiabilidad a largo plazo.',
    summary: 'SOLUCIONES DE PINTADO Y TRATAMIENTO DE SUPERFICIES ADAPTADAS A LAS EXIGENCIAS DE CADA SECTOR INDUSTRIAL',
  },
};

function ServicesIndexPanel({ onSelectService }) {
  const reveal = useCardReveal();
  const {
    activeImageIndex,
    pauseCarousel,
    resumeCarousel,
    showPreviousImage,
    showNextImage,
  } = useImageCarousel(showcaseImages.length);

  return (
    <motion.div
      className="horizontal-services"
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={reveal.card}
    >
      <section className="horizontal-services__visual">
        <CoverflowFrame
          images={showcaseImages}
          activeImageIndex={activeImageIndex}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onPause={pauseCarousel}
          onResume={resumeCarousel}
        />
        <div className="horizontal-services__dots" aria-hidden="true">
          {showcaseImages.map((image, index) => (
            <span key={image.id} className={`horizontal-services__dot${index === activeImageIndex ? ' is-active' : ''}`} />
          ))}
        </div>
        <h2>SERVICIOS</h2>
      </section>

      <section className="horizontal-services__content">
        <div className="horizontal-services__list">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className="horizontal-services__service"
              onClick={() => onSelectService(service.id)}
            >
              <span className="horizontal-services__service-title">{service.title}</span>
              <span className="horizontal-services__service-icon" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
        <div className="horizontal-services__detail-image">
          <img src={`${import.meta.env.BASE_URL}image/maquinas.png`} alt="Maquinaria y herramientas para tratamientos técnicos" />
        </div>
      </section>
    </motion.div>
  );
}

function ServicePanel({ service, onBackToServices }) {
  const reveal = useCardReveal();
  const [activeFinishesId, setActiveFinishesId] = useState(null);
  const copy = detailCopy[service.id] ?? {
    title: service.title.toUpperCase(),
    technicalTitle: service.summary,
    description: service.description,
    summary: service.summary,
  };
  const images = serviceImages[service.id] ?? showcaseImages;
  const {
    activeImageIndex,
    pauseCarousel,
    resumeCarousel,
    showPreviousImage,
    showNextImage,
  } = useImageCarousel(images.length);

  return (
    <motion.div
      className="horizontal-detail"
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={reveal.card}
    >
      <section className="horizontal-detail__visual" aria-label="Imágenes del servicio">
        <button
          type="button"
          className="horizontal-detail__back"
          onClick={onBackToServices}
          aria-label="Volver a servicios"
        >
          ← Servicios
        </button>
        <h2>{copy.title}</h2>
        <div className="horizontal-detail__rule" />
        <CoverflowFrame
          images={images}
          activeImageIndex={activeImageIndex}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onPause={pauseCarousel}
          onResume={resumeCarousel}
        />
        <div className="horizontal-detail__dots" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image.id} className={`horizontal-detail__dot${index === activeImageIndex ? ' is-active' : ''}`} />
          ))}
        </div>
        <p className="horizontal-detail__summary">{copy.summary}</p>
      </section>

      <aside className="horizontal-detail__content">
        {activeFinishesId ? (
          <ServiceFinishesPanel
            serviceId={activeFinishesId}
            onBack={() => setActiveFinishesId(null)}
          />
        ) : (
          <>
            <h3>{copy.technicalTitle}</h3>
            <p className="horizontal-detail__description">{copy.description}</p>
            {(service.id === 'powder' || service.id === 'liquid') && (
              <button
                type="button"
                className="horizontal-detail__finish-note"
                onClick={() => setActiveFinishesId(service.id)}
              >
                VERSATILIDAD EN COLORES Y ACABADOS
              </button>
            )}
          </>
        )}
      </aside>
    </motion.div>
  );
}

function SectorPanel({ sector, onBackToSectors }) {
  const reveal = useCardReveal();
  const copy = sectorDetailCopy[sector.id] ?? {
    title: sector.title.toUpperCase(),
    technicalTitle: null,
    description: sector.description,
    summary: sector.description,
  };
  const images = sectorImagesById[sector.id] ?? sectorImages;
  const {
    activeImageIndex,
    pauseCarousel,
    resumeCarousel,
    showPreviousImage,
    showNextImage,
  } = useImageCarousel(images.length);

  return (
    <motion.div
      className="horizontal-detail"
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={reveal.card}
    >
      <section className="horizontal-detail__visual" aria-label={`Imágenes de ${sector.title}`}>
        <button
          type="button"
          className="horizontal-detail__back"
          onClick={onBackToSectors}
          aria-label="Volver a sectores"
        >
          ← Sectores
        </button>
        <h2>{copy.title}</h2>
        <div className="horizontal-detail__rule" />
        <CoverflowFrame
          images={images}
          activeImageIndex={activeImageIndex}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onPause={pauseCarousel}
          onResume={resumeCarousel}
        />
        <div className="horizontal-detail__dots" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image.id} className={`horizontal-detail__dot${index === activeImageIndex ? ' is-active' : ''}`} />
          ))}
        </div>
        <p className="horizontal-detail__summary">{copy.summary}</p>
      </section>

      <aside className="horizontal-detail__content">
        {copy.technicalTitle ? <h3>{copy.technicalTitle}</h3> : null}
        <p className="horizontal-detail__description">{copy.description}</p>
        {copy.secondaryDescription ? (
          <p className="horizontal-detail__description">{copy.secondaryDescription}</p>
        ) : null}
      </aside>
    </motion.div>
  );
}

function ProcessGridPanel({ title, items }) {
  const reveal = useCardReveal();
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <motion.div
      className="horizontal-process"
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={reveal.card}
    >
      <h2>{title}</h2>
      <div className="horizontal-process__grid">
        {columns.map((columnItems, columnIndex) => (
          <ul key={columnIndex} className="horizontal-process__column">
            {columnItems.map((item) => (
              <li key={item.id} className="horizontal-process__item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </motion.div>
  );
}

function AccordionIndexPanel({
  title,
  items,
  compact = false,
  onSelectItem,
}) {
  const reveal = useCardReveal();
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const {
    activeImageIndex,
    pauseCarousel,
    resumeCarousel,
    showPreviousImage,
    showNextImage,
  } = useImageCarousel(showcaseImages.length);

  return (
    <motion.div
      className={`horizontal-services${compact ? ' horizontal-services--compact' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={cardViewport}
      variants={reveal.card}
    >
      <section className="horizontal-services__visual">
        <CoverflowFrame
          images={showcaseImages}
          activeImageIndex={activeImageIndex}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onPause={pauseCarousel}
          onResume={resumeCarousel}
        />
        <div className="horizontal-services__dots" aria-hidden="true">
          {showcaseImages.map((image, index) => (
            <span key={image.id} className={`horizontal-services__dot${index === activeImageIndex ? ' is-active' : ''}`} />
          ))}
        </div>
        <h2>{title}</h2>
      </section>

      <section className="horizontal-services__content">
        <div className="horizontal-services__list">
          {items.map((item) => {
            if (onSelectItem) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className="horizontal-services__service"
                  onClick={() => onSelectItem(item.id)}
                >
                  <span className="horizontal-services__service-title">{item.title}</span>
                  <span className="horizontal-services__service-icon" aria-hidden="true">→</span>
                </button>
              );
            }

            const isActive = item.id === activeId;

            return (
              <div
                key={item.id}
                className={`horizontal-services__item${isActive ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="horizontal-services__service"
                  aria-expanded={isActive}
                  onClick={() => setActiveId(item.id)}
                >
                  <span className="horizontal-services__service-title">{item.title}</span>
                  <span className="horizontal-services__service-icon" aria-hidden="true">
                    {isActive ? '−' : '+'}
                  </span>
                </button>
                {isActive && item.description && (
                  <p className="horizontal-services__item-copy">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="horizontal-services__detail-image">
          <img src={`${import.meta.env.BASE_URL}image/maquinas.png`} alt="Maquinaria y herramientas para tratamientos técnicos" />
        </div>
      </section>
    </motion.div>
  );
}

function HorizontalHome({ onSelectService, mapsConsent, onAcceptMaps }) {
  const reveal = useCardReveal();

  return (
    <>
      <section
        id="servicios"
        className="horizontal-panel horizontal-panel--services"
        data-panel-id="servicios"
      >
        <ServicesIndexPanel onSelectService={onSelectService} />
      </section>
      {services.map((service) => (
        <section
          key={service.id}
          id={`servicio-${service.id}`}
          className="horizontal-panel horizontal-panel--detail"
          data-panel-id={service.id}
        >
          <ServicePanel
            service={service}
            onBackToServices={() => onSelectService('servicios')}
          />
        </section>
      ))}
      <section
        id="sectores"
        className="horizontal-panel horizontal-panel--services"
        data-panel-id="sectores"
      >
        <AccordionIndexPanel
          title="SECTORES"
          items={sectors}
          onSelectItem={onSelectService}
        />
      </section>
      {sectors.map((sector) => (
        <section
          key={sector.id}
          id={`sector-${sector.id}`}
          className="horizontal-panel horizontal-panel--detail"
          data-panel-id={sector.id}
        >
          <SectorPanel
            sector={sector}
            onBackToSectors={() => onSelectService('sectores')}
          />
        </section>
      ))}
      <section
        id="procesos"
        className="horizontal-panel horizontal-panel--services"
        data-panel-id="procesos"
      >
        <ProcessGridPanel title="PROCESOS" items={processSteps} />
      </section>
      <section
        className="horizontal-panel horizontal-panel--contact"
        data-panel-id="contacto"
      >
        <motion.div
          className="horizontal-contact"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewport}
          variants={reveal.card}
        >
          <Contact
            isOpen
            inline
            mapsConsent={mapsConsent}
            onAcceptMaps={onAcceptMaps}
          />
        </motion.div>
      </section>
    </>
  );
}

export default HorizontalHome;
