import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import PaintLogo from './components/PaintLogo';
import Navigation from './components/Navigation';
import { services, showcaseImages } from './components/Services';
import ServicesOverlay from './components/ServicesOverlay';
import ServiceDetailOverlay from './components/ServiceDetailOverlay';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HorizontalHome from './components/HorizontalHome';

function App() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDesktopHorizontal, setIsDesktopHorizontal] = useState(false);
  const horizontalStoryRef = useRef(null);
  const heroVideoRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const panelIds = ['inicio', 'servicios', 'powder', 'liquid', 'technical', 'contacto'];
  const panelCount = panelIds.length;
  const { scrollYProgress } = useScroll({
    target: horizontalStoryRef,
    offset: ['start start', 'end end'],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(panelCount - 1) * 100}vw`]);

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
    if (!isServicesOpen && !isContactOpen) {
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
  }, [isServicesOpen, isContactOpen]);

  const openServices = () => {
    if (isDesktopHorizontal) {
      scrollToPanel('servicios');
      return;
    }

    setIsServicesOpen(true);
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

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollToRelativePanel(1);
    }

    if (event.key === 'ArrowLeft') {
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
  }, [isDesktopHorizontal]);

  useMotionValueEvent(scrollYProgress, 'change', (latestProgress) => {
    const video = heroVideoRef.current;

    if (!isDesktopHorizontal) {
      return;
    }

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
        <main
          ref={horizontalStoryRef}
          className="horizontal-story"
          style={{ '--horizontal-panel-count': panelCount }}
        >
          <div className="horizontal-page">
            <motion.div className="horizontal-track" style={{ x: trackX }}>
              <section className="horizontal-panel horizontal-panel--hero" data-panel-id="inicio">
                <Header
                  videoRef={heroVideoRef}
                  showBackground={!isDesktopHorizontal}
                  onOpenServices={openServices}
                  onOpenContact={openContact}
                />
              </section>
              <HorizontalHome onSelectService={scrollToPanel} />
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
      <Navigation
        onOpenContact={openContact}
        onNavigate={isDesktopHorizontal ? scrollToPanel : undefined}
      />
      <Contact isOpen={isContactOpen} onClose={closeContact} />
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
    </>
  );
}

export default App;
