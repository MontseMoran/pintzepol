import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import { services, showcaseImages } from './components/Services';
import ServicesOverlay from './components/ServicesOverlay';
import ServiceDetailOverlay from './components/ServiceDetailOverlay';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const scrollPositionRef = useRef(0);

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
    setIsServicesOpen(true);
  };

  const openContact = () => {
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

  return (
    <>
      <div className="home-shell">
        <Header onOpenServices={openServices} onOpenContact={openContact} />
        <Footer />
      </div>
      <Navigation onOpenContact={openContact} />
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
      />
    </>
  );
}

export default App;
