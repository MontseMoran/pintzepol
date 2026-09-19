import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Header from './components/Header';
import PaintLogo from './components/PaintLogo';
import Navigation from './components/Navigation';
import { services, showcaseImages } from './components/Services';
import { processSteps, readCookieConsent, saveCookieConsent, sectors } from './content/company';
import ServicesOverlay from './components/ServicesOverlay';
import ServiceDetailOverlay from './components/ServiceDetailOverlay';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HorizontalHome, { sectorDetailCopy } from './components/HorizontalHome';
import LegalOverlay from './components/LegalOverlay';
import CookieBanner from './components/CookieBanner';
import JourneyOverlay from './components/JourneyOverlay';

function App() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDesktopHorizontal, setIsDesktopHorizontal] = useState(false);
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [isSectoresOpen, setIsSectoresOpen] = useState(false);
  const [isProcesosOpen, setIsProcesosOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [legalDocumentId, setLegalDocumentId] = useState(null);
  const [cookieConsent, setCookieConsent] = useState(null);
  const horizontalStoryRef = useRef(null);
  const heroVideoRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const panelIds = ['inicio', 'servicios', 'powder', 'liquid', 'technical', 'sectores', 'transporte', 'industria', 'salud', 'tecnologia', 'procesos', 'contacto'];
  const panelLabels = ['INICIO', 'SERVICIOS', 'PINTURA EN POLVO', 'PINTURA LÍQUIDA', 'TRATAMIENTOS', 'SECTORES', 'TRANSPORTE', 'INDUSTRIA', 'SALUD', 'TECNOLOGÍA', 'PROCESOS', 'UBICACIÓN'];
  const panelCount = panelIds.length;
  const { scrollYProgress } = useScroll({
    target: horizontalStoryRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopMode = () => {
      setIsDesktopHorizontal(mediaQuery.matches);
    };

    updateDesktopMode();
    mediaQuery.addEventListener('change', updateDesktopMode);

    return () => {
      mediaQuery.removeEventListener('change', updateDesktopMode);
    };
  }, []);

  useEffect(() => {
    if (!isServicesOpen && !isContactOpen && !isSectoresOpen && !isProcesosOpen && !legalDocumentId && !selectedSector) {
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
  }, [isServicesOpen, isContactOpen, isSectoresOpen, isProcesosOpen, legalDocumentId, selectedSector]);

  useEffect(() => {
    setCookieConsent(readCookieConsent());
  }, []);

  const updateCookieConsent = (value) => {
    saveCookieConsent(value);
    setCookieConsent(value);
  };

  const openServices = () => {
    if (isDesktopHorizontal) {
      scrollToPanel('servicios');
      return;
    }

    setIsServicesOpen(true);
  };

  const openSectores = () => {
    if (isDesktopHorizontal) {
      scrollToPanel('sectores');
      return;
    }

    setIsSectoresOpen(true);
  };

  const openProcesos = () => {
    if (isDesktopHorizontal) {
      scrollToPanel('procesos');
      return;
    }

    setIsProcesosOpen(true);
  };

  const openContact = () => {
    if (isDesktopHorizontal) {
      scrollToPanel('contacto');
      return;
    }

    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  const closeServices = () => {
    setSelectedService(null);
    setIsServicesOpen(false);
  };

  const openServiceDetail = (service) => {
    setSelectedService(service);
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
  };

  const closeSectores = () => {
    setSelectedSector(null);
    setIsSectoresOpen(false);
  };

  const openSectorDetail = (item) => {
    setSelectedSector(item);
  };

  const closeSectorDetail = () => {
    setSelectedSector(null);
  };

  const closeLegal = () => {
    setLegalDocumentId(null);
  };

  const openLegal = (documentId) => {
    setLegalDocumentId(documentId);
  };

  const scrollToPanel = (panelId, behaviorOverride) => {
    const story = horizontalStoryRef.current;
    const panelIndex = panelIds.indexOf(panelId);

    if (!story || panelIndex === -1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storyTop = story.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = story.offsetHeight - window.innerHeight;
    const panelProgress = panelIndex / (panelCount - 1);

    window.scrollTo({
      top: storyTop + scrollableDistance * panelProgress,
      behavior: behaviorOverride ?? (prefersReducedMotion ? 'auto' : 'smooth'),
    });
  };

  const scrollToRelativePanel = (direction) => {
    const currentIndex = Math.round(scrollYProgress.get() * (panelCount - 1));
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), panelIds.length - 1);
    scrollToPanel(panelIds[nextIndex]);
  };

  const handleHorizontalKeyDown = (event) => {
    if (!isDesktopHorizontal || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    if (legalDocumentId || isContactOpen || isServicesOpen || isSectoresOpen || isProcesosOpen || selectedSector) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault();
      scrollToRelativePanel(1);
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      scrollToRelativePanel(-1);
    }
  };

  useEffect(() => {
    if (!isDesktopHorizontal) {
      return undefined;
    }

    window.addEventListener('keydown', handleHorizontalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleHorizontalKeyDown);
    };
  }, [isDesktopHorizontal, isContactOpen, isServicesOpen, isSectoresOpen, isProcesosOpen, legalDocumentId, selectedSector]);

  useMotionValueEvent(scrollYProgress, 'change', (latestProgress) => {
    const video = heroVideoRef.current;

    if (!isDesktopHorizontal) {
      return;
    }

    const nextPanelIndex = Math.min(
      Math.max(Math.round(latestProgress * (panelCount - 1)), 0),
      panelCount - 1,
    );

    setActivePanelIndex((currentPanelIndex) => (
      currentPanelIndex === nextPanelIndex ? currentPanelIndex : nextPanelIndex
    ));

    if (!video) {
      return;
    }

    const isHeroActive = latestProgress < 0.04;

    if (isHeroActive && video.paused) {
      video.play().catch(() => {});
    }

    if (!isHeroActive && !video.paused) {
      video.pause();
    }
  });

  return (
    <>
      <div className="home-shell">
        {isDesktopHorizontal && (
          <div className="horizontal-background" aria-hidden="true">
            <Header
              videoRef={heroVideoRef}
              showContent={false}
            />
          </div>
        )}
        {isDesktopHorizontal && (
          <div className="horizontal-brand" aria-label="Logo Pintzepol">
            <img src="image/logo.svg" alt="Logo Pintzepol" className="hero__logo hero__logo--static" />
            <PaintLogo videoRef={heroVideoRef} />
          </div>
        )}
        {isDesktopHorizontal && (
          <aside className="horizontal-progress" aria-label="Progreso del recorrido">
            <p className="horizontal-progress__count">
              <span>{String(activePanelIndex + 1).padStart(2, '0')}</span>
              <span className="horizontal-progress__total"> / {String(panelCount).padStart(2, '0')}</span>
            </p>
            <p className="horizontal-progress__label">{panelLabels[activePanelIndex]}</p>
            <div className="horizontal-progress__bar" aria-hidden="true">
              <motion.span className="horizontal-progress__value" style={{ scaleX: scrollYProgress }} />
            </div>
          </aside>
        )}
        <main
          ref={horizontalStoryRef}
          className="horizontal-story"
          style={{ '--horizontal-panel-count': panelCount }}
        >
          <div className="horizontal-page">
            <div className="horizontal-track">
              <section className="horizontal-panel horizontal-panel--hero" data-panel-id="inicio">
                <Header
                  videoRef={heroVideoRef}
                  showBackground={!isDesktopHorizontal}
                  onOpenServices={openServices}
                  onOpenContact={openContact}
                />
              </section>
              <HorizontalHome
                onSelectService={scrollToPanel}
                mapsConsent={cookieConsent === 'maps'}
                onAcceptMaps={() => updateCookieConsent('maps')}
              />
            </div>
          </div>
        </main>
        <Footer onOpenLegal={openLegal} />
      </div>
      <Navigation
        onOpenContact={openContact}
        onOpenServices={openServices}
        onOpenSectores={openSectores}
        onOpenProcesos={openProcesos}
        onNavigate={isDesktopHorizontal ? scrollToPanel : undefined}
      />
      <Contact
        isOpen={isContactOpen}
        onClose={closeContact}
        mapsConsent={cookieConsent === 'maps'}
        onAcceptMaps={() => updateCookieConsent('maps')}
      />
      <LegalOverlay
        documentId={legalDocumentId}
        onClose={closeLegal}
        onSelectDocument={openLegal}
      />
      <CookieBanner
        isVisible={!cookieConsent}
        onOpenCookies={() => openLegal('cookies')}
        onAcceptNecessary={() => updateCookieConsent('necessary')}
        onAcceptMaps={() => updateCookieConsent('maps')}
      />
      <JourneyOverlay
        isOpen={isSectoresOpen}
        title="SECTORES"
        items={sectors}
        images={showcaseImages}
        onClose={closeSectores}
        onSelectItem={openSectorDetail}
      />
      <JourneyOverlay
        isOpen={isProcesosOpen}
        title="PROCESOS"
        items={processSteps}
        images={showcaseImages}
        layout="process"
        onClose={() => setIsProcesosOpen(false)}
      />
      <ServicesOverlay
        isOpen={isServicesOpen}
        isDetailOpen={Boolean(selectedService)}
        services={services}
        images={showcaseImages}
        onClose={closeServices}
        onSelectService={openServiceDetail}
      />
      <ServiceDetailOverlay
        service={selectedService}
        images={showcaseImages}
        lockScroll={false}
        onClose={closeServiceDetail}
        onCloseAll={closeServices}
      />
      <ServiceDetailOverlay
        service={selectedSector}
        images={showcaseImages}
        lockScroll={false}
        backLabel="← SECTORES"
        copy={selectedSector ? sectorDetailCopy[selectedSector.id] : null}
        onClose={closeSectorDetail}
        onCloseAll={closeSectores}
      />
    </>
  );
}

export default App;
