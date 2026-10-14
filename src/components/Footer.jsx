import React from 'react';
import { company } from '../content/company';
import { legalNav } from '../content/legalTexts';
import '../styles/components/Footer.scss';

function Footer({ onOpenLegal }) {
  return (
    <footer className="site-footer">
      <p>© 2026 {company.legalName}</p>
      <a
        className="site-footer__signature"
        href="https://montsemoran.es"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Desarrollo web por Montse Morán"
      >
        <span className="site-footer__signature-label">Desarrollo web</span>
        <span className="site-footer__signature-credit">
          <span className="site-footer__signature-separator" aria-hidden="true">·</span>
          <span>Montse Morán</span>
          <img className="site-footer__signature-mark" src="image/favicon-32x32.png" alt="" aria-hidden="true" />
        </span>
      </a>
      <nav aria-label="Enlaces legales">
        {legalNav.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <span>·</span>}
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                onOpenLegal?.(item.id);
              }}
            >
              {item.label}
            </a>
          </React.Fragment>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;
