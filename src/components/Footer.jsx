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
        <svg className="site-footer__signature-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path d="M24 8c5.3 0 9.6 4.3 9.6 9.6 0 2.5-1 4.8-2.6 6.5 5.1.4 9.1 4.6 9.1 9.8 0 5.4-4.4 9.8-9.8 9.8-2.5 0-4.8-.9-6.5-2.5-1.8 1.6-4.1 2.5-6.6 2.5-5.4 0-9.8-4.4-9.8-9.8 0-5.2 4-9.4 9.1-9.8-1.6-1.7-2.6-4-2.6-6.5C14.4 12.3 18.7 8 24 8Zm0 5.5c-2.3 0-4.1 1.8-4.1 4.1 0 2.2 1.8 4.1 4.1 4.1s4.1-1.9 4.1-4.1c0-2.3-1.8-4.1-4.1-4.1Zm-6.8 16.1c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c2.3 0 4.2-1.8 4.3-4.1l-3.1-4.4c-.4-.1-.8-.1-1.2-.1Zm13.1 0c-.4 0-.8 0-1.2.1L26 34.1c.1 2.3 2 4.1 4.3 4.1 2.4 0 4.3-1.9 4.3-4.3s-1.9-4.3-4.3-4.3Zm-6.4-1.2-2.1 3 2.1 3 2.1-3-2.1-3Z" />
        </svg>
        <span>Desarrollo web · Montse Morán</span>
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
