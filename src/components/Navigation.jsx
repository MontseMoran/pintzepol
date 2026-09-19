import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/Navbar.scss';

function Navigation({ onOpenContact, onOpenServices, onOpenSectores, onOpenProcesos, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const links = [
    { href: '#inicio', label: 'INTRO', panelId: 'inicio' },
    { href: '#servicios', label: 'SERVICIOS', panelId: 'servicios', action: onNavigate ? undefined : onOpenServices },
    { href: '#sectores', label: 'SECTORES', panelId: 'sectores', action: onNavigate ? undefined : onOpenSectores },
    { href: '#procesos', label: 'PROCESOS', panelId: 'procesos', action: onNavigate ? undefined : onOpenProcesos },
    { href: '#contacto', label: 'UBICACIÓN', action: onOpenContact },
  ];

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <nav ref={navRef} className={`floating-nav ${isOpen ? 'is-open' : ''}`} aria-label="Menú principal">
      <button
        type="button"
        className="floating-nav__toggle"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="floating-nav-panel"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="floating-nav-panel" className="floating-nav__panel">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(event) => {
              if (link.action) {
                event.preventDefault();
                link.action();
              } else if (onNavigate && link.panelId) {
                event.preventDefault();
                onNavigate(link.panelId);
              }

              handleClose();
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
