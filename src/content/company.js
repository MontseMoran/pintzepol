export const COOKIE_NOTICE_KEY = 'pintzepol-cookie-notice';
export const COOKIE_CONSENT_KEY = 'pintzepol-cookie-consent';

export function readCookieConsent() {
  try {
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (consent === 'maps' || consent === 'necessary') {
      return consent;
    }

    if (window.localStorage.getItem(COOKIE_NOTICE_KEY) === 'acknowledged') {
      return 'necessary';
    }
  } catch {
    return null;
  }

  return null;
}

export function saveCookieConsent(value) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.localStorage.setItem(COOKIE_NOTICE_KEY, 'acknowledged');
  } catch {
    // Si el almacenamiento no está disponible, el consentimiento solo vale en esta visita.
  }
}

export const company = {
  legalName: 'PINTZEPOL, S.L.U.',
  nif: 'B75577361',
  address: 'Calle Sardana, 7-9, Polígono Industrial Cova Solera, 08191 Rubí (Barcelona)',
  email: 'info@pintzepol.com',
  phoneDisplay: '93 699 01 20',
  phoneTel: '+34936990120',
  registry:
    'Registro Mercantil de Barcelona, tomo/sección 8.ª, hoja B-626579, inscripción 1.ª, de 24 de diciembre de 2024',
  aepdUrl: 'https://www.aepd.es',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Calle%20Sardana%207-9%2C%20Pol%C3%ADgono%20Industrial%20Cova%20Solera%2C%2008191%20Rub%C3%AD%2C%20Barcelona&hl=es&z=17&output=embed',
  mapsExternalUrl:
    'https://www.google.com/maps/search/?api=1&query=Calle%20Sardana%207-9%2C%20Pol%C3%ADgono%20Industrial%20Cova%20Solera%2C%2008191%20Rub%C3%AD',
};

export const sectors = [
  {
    id: 'transporte',
    title: 'Transporte',
    description:
      'Soluciones de pintado y tratamiento de superficies adaptadas a las exigencias de cada sector industrial.',
  },
  {
    id: 'industria',
    title: 'Industria',
    description:
      'Soluciones de pintado y tratamiento de superficies adaptadas a las exigencias de cada sector industrial.',
  },
  {
    id: 'salud',
    title: 'Salud',
    description:
      'Soluciones de pintado y tratamiento de superficies adaptadas a las exigencias de cada sector industrial.',
  },
  {
    id: 'tecnologia',
    title: 'Tecnología',
    description:
      'Soluciones de pintado y tratamiento de superficies adaptadas a las exigencias de cada sector industrial.',
  },
];

export const processSteps = [
  {
    id: 'recepcion',
    title: 'Recepción de piezas',
    description: 'Identificación, revisión del estado y preparación para el proceso.',
  },
  {
    id: 'tratamiento',
    title: 'Tratamiento previo',
    description: 'Desengrase y limpieza de la superficie para asegurar la correcta adherencia del recubrimiento.',
  },
  {
    id: 'imprimacion',
    title: 'Imprimación',
    description: 'Aplicación de la imprimación adecuada según el material, el uso final de la pieza y el sistema de pintura.',
  },
  {
    id: 'aplicacion',
    title: 'Aplicación de pintura',
    description: 'Aplicación de pintura líquida o en polvo conforme a las especificaciones técnicas requeridas.',
  },
  {
    id: 'secado',
    title: 'Secado y curado',
    description: 'Secado en horno con aire forzado para garantizar el curado correcto del acabado.',
  },
  {
    id: 'verificacion',
    title: 'Control de calidad',
    description: 'Inspección final de las piezas para comprobar uniformidad, adherencia y acabado.',
  },
  {
    id: 'expedicion',
    title: 'Expedición',
    description: 'Embalaje y preparación del pedido para su entrega.',
  },
];
