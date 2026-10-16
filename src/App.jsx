import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import PaintLogo from './components/PaintLogo';
import Navigation from './components/Navigation';
import { readCookieConsent, saveCookieConsent } from './content/company';
import Footer from './components/Footer';
import HorizontalHome from './components/HorizontalHome';
import LegalOverlay from './components/LegalOverlay';
import CookieBanner from './components/CookieBanner';

function App() {
  const [isDesktopHorizontal, setIsDesktopHorizontal] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false
  );
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [legalDocumentId, setLegalDocumentId] = useState(null);
  const [cookieConsent, setCookieConsent] = useState(null);
  const horizontalStoryRef = useRef(null);
  const heroVideoRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const panelIds = ['inicio', 'servicios', 'sectores', 'procesos', 'contacto'];
  const panelLabels = ['INICIO', 'SERVICIOS', 'SECTORES', 'PROCESOS', 'CONTACTO'];
  const panelCount = panelIds.length;
  const processesPanelIndex = panelIds.indexOf('procesos');
  const maxPanelIndex = panelCount - 1;
  const processesStart = Math.max((processesPanelIndex - 1) / maxPanelIndex, 0);
  const processesEnd = processesPanelIndex / maxPanelIndex;
  const { scrollYProgress } = useScroll({
    target: horizontalStoryRef,
    offset: ['start start', 'end end'],
  });
  const processesProgress = useTransform(
    scrollYProgress,
    [
      processesStart,
      processesEnd,
    ],
    [0, 1],
    { clamp: true },
  );

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
    if (!legalDocumentId) {
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
  }, [legalDocumentId]);

  useEffect(() => {
    setCookieConsent(readCookieConsent());
  }, []);

  const updateCookieConsent = (value) => {
    saveCookieConsent(value);
    setCookieConsent(value);
  };

  const scrollToSection = (sectionId) => {
    if (isDesktopHorizontal) {
      scrollToPanel(sectionId);
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    section.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const openServices = () => {
    scrollToSection('servicios');
  };

  const openSectores = () => {
    scrollToSection('sectores');
  };

  const openProcesos = () => {
    scrollToSection('procesos');
  };

  const openContact = () => {
    scrollToSection('contacto');
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

    if (legalDocumentId) {
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
  }, [isDesktopHorizontal, legalDocumentId]);

  useMotionValueEvent(scrollYProgress, 'change', (latestProgress) => {
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
  });

  return (
    <>
      <div className="home-shell">
        <div className="horizontal-background" aria-hidden="true">
          {isDesktopHorizontal ? (
            <Header
              videoRef={heroVideoRef}
              showContent={false}
            />
          ) : (
            <video
              ref={heroVideoRef}
              className="horizontal-background__video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="image/video3.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="horizontal-brand" aria-label="Logo Pintzepol">
          <img src="image/logo-efect/logo-filled.svg" alt="Logo Pintzepol" className="hero__logo hero__logo--static" />
          {isDesktopHorizontal && <PaintLogo videoRef={heroVideoRef} />}
        </div>
        <div className="horizontal-brand__outline-layer" aria-hidden="true">
          <img src="image/logo-efect/logo-outline.svg" alt="" />
        </div>
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
                  showBackground={false}
                  onOpenServices={openServices}
                  onOpenContact={openContact}
                  useEmailCta
                />
              </section>
              <HorizontalHome
                isDesktopHorizontal={isDesktopHorizontal}
                mapsConsent={cookieConsent === 'maps'}
                onAcceptMaps={() => updateCookieConsent('maps')}
                processesProgress={processesProgress}
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
        onNavigate={isDesktopHorizontal ? scrollToPanel : scrollToSection}
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
    </>
  );
}

export default App;
