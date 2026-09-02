import React, { useState } from 'react';
import '../styles/components/Navbar.scss';

function Navigation({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '#inicio', label: 'INTRO' },
    { href: '#servicios', label: 'SERVICIOS' },
    { href: '#servicios', label: 'SECTORES' },
    { href: '#servicios', label: 'PROCESOS' },
    { href: '#contacto', label: 'UBICACIÓN', action: onOpenContact },
  ];

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`floating-nav ${isOpen ? 'is-open' : ''}`} aria-label="Menú principal">
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
