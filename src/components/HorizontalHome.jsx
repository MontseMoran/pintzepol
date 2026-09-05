import React, { useState } from 'react';
import { services, showcaseImages } from './Services';
import Contact from './Contact';
import '../styles/components/HorizontalHome.scss';

const detailCopy = {
  powder: {
    title: 'PINTURA EN POLVO',
    technicalTitle: 'ACABADOS DE ALTA RESISTENCIA Y DURABILIDAD',
    description: 'Recubrimientos resistentes y duraderos que protegen y mejoran piezas industriales, garantizando uniformidad, calidad y fiabilidad a largo plazo.',
    summary: 'SOLUCIONES DE PINTADO Y TRATAMIENTO DE SUPERFICIES ADAPTADAS A LAS EXIGENCIAS DE CADA SECTOR INDUSTRIAL',
  },
  liquid: {
    title: 'PINTURA LÍQUIDA',
    technicalTitle: 'PINTURA LÍQUIDA DE ALTA PRECISIÓN',
    description: 'Aplicación de pintura líquida en piezas metálicas, plásticas y vítreas para obtener acabados uniformes, resistentes y de alta calidad.',
    summary: 'SOLUCIONES DE ACABADO ADAPTADAS A DIFERENTES MATERIALES Y APLICACIONES.',
  },
};

const serviceImages = {
  powder: [
    { id: 'polvo-1', src: `${import.meta.env.BASE_URL}image/polvo/Polvo1.webp`, alt: showcaseImages[0].alt },
    { id: 'polvo-2', src: `${import.meta.env.BASE_URL}image/polvo/Polvo2.webp`, alt: showcaseImages[1].alt },
    { id: 'polvo-3', src: `${import.meta.env.BASE_URL}image/polvo/Polvo3.webp`, alt: showcaseImages[2].alt },
  ],
  liquid: [
    { id: 'liquido-1', src: `${import.meta.env.BASE_URL}image/liquido/Liquido1.webp`, alt: showcaseImages[0].alt },
    { id: 'liquido-2', src: `${import.meta.env.BASE_URL}image/liquido/liquidocadena.webp`, alt: showcaseImages[1].alt },
    { id: 'liquido-3', src: `${import.meta.env.BASE_URL}image/liquido/liquido2.webp`, alt: showcaseImages[2].alt },
  ],
};

function ServicesIndexPanel({ onSelectService }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = showcaseImages[activeImageIndex] ?? showcaseImages[0];

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === 0 ? showcaseImages.length - 1 : currentIndex - 1
    ));
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (
      currentIndex === showcaseImages.length - 1 ? 0 : currentIndex + 1
    ));
  };

  return (
    <div className="horizontal-services">
      <section className="horizontal-services__visual">
        <div className="horizontal-services__main-image">
          <img src={activeImage.src} alt={activeImage.alt} />
          <button type="button" className="horizontal-services__image-nav horizontal-services__image-nav--previous" onClick={showPreviousImage} aria-label="Imagen anterior">
            &lsaquo;
          </button>
          <button type="button" className="horizontal-services__image-nav horizontal-services__image-nav--next" onClick={showNextImage} aria-label="Imagen siguiente">
            &rsaquo;
          </button>
        </div>
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
          <img src="image/maquinas.png" alt="Maquinaria y herramientas para tratamientos técnicos" />
        </div>
      </section>
    </div>
  );
}

function ServicePanel({ service }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const copy = detailCopy[service.id] ?? {
    title: service.title.toUpperCase(),
    technicalTitle: service.summary,
    description: service.description,
    summary: service.summary,
  };
  const images = serviceImages[service.id] ?? showcaseImages;
  const activeImage = images[activeImageIndex] ?? images[0];

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
    <div className="horizontal-detail">
      <section className="horizontal-detail__visual" aria-label="Imágenes del servicio">
        <h2>{copy.title}</h2>
        <div className="horizontal-detail__rule" />
        <div className="horizontal-detail__image-frame">
          <img src={activeImage.src} alt={activeImage.alt} />
          {images.length > 1 && (
            <>
              <button type="button" className="horizontal-detail__image-nav horizontal-detail__image-nav--previous" onClick={showPreviousImage} aria-label="Imagen anterior">
                &lsaquo;
              </button>
              <button type="button" className="horizontal-detail__image-nav horizontal-detail__image-nav--next" onClick={showNextImage} aria-label="Imagen siguiente">
                &rsaquo;
              </button>
            </>
          )}
        </div>
        <div className="horizontal-detail__dots" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image.id} className={`horizontal-detail__dot${index === activeImageIndex ? ' is-active' : ''}`} />
          ))}
        </div>
        <p className="horizontal-detail__summary">{copy.summary}</p>
      </section>

      <aside className="horizontal-detail__content">
        <h3>{copy.technicalTitle}</h3>
        <p className="horizontal-detail__description">{copy.description}</p>
        {service.id === 'powder' && (
          <div className="horizontal-detail__finish-samples">
            <div className="horizontal-detail__finish-placeholder">
              FALTA IMAGEN DE MUESTRAS DE ACABADOS
            </div>
            <p>AMPLIA VARIEDAD DE ACABADOS</p>
          </div>
        )}
      </aside>
    </div>
  );
}

function HorizontalHome({ onSelectService }) {
  return (
    <>
      <section id="servicios" className="horizontal-panel horizontal-panel--services" data-panel-id="servicios">
        <ServicesIndexPanel onSelectService={onSelectService} />
      </section>
      {services.map((service) => (
        <section
          key={service.id}
          id={`servicio-${service.id}`}
          className="horizontal-panel horizontal-panel--detail"
          data-panel-id={service.id}
        >
          <ServicePanel service={service} />
        </section>
      ))}
      <section className="horizontal-panel horizontal-panel--contact" data-panel-id="contacto">
        <Contact isOpen inline />
      </section>
    </>
  );
}

export default HorizontalHome;
