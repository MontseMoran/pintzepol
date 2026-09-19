import React from 'react';
import { company } from '../content/company';
import { legalNav } from '../content/legalTexts';
import '../styles/components/Footer.scss';

function Footer({ onOpenLegal }) {
  return (
    <footer className="site-footer">
      <p>© 2026 {company.legalName}</p>
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
