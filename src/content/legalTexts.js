import { company } from './company';

const lastUpdate = '19 de septiembre de 2026';

export const legalDocuments = {
  'aviso-legal': {
    id: 'aviso-legal',
    title: 'Aviso legal',
    updated: lastUpdate,
    sections: [
      {
        heading: '1. Datos identificativos',
        paragraphs: [
          `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web:`,
        ],
        list: [
          `Razón social: ${company.legalName}`,
          `NIF/CIF: ${company.nif}`,
          `Domicilio fiscal y social: ${company.address}`,
          `Correo electrónico: ${company.email}`,
          `Teléfono: ${company.phoneDisplay}`,
          `Datos registrales: ${company.registry}`,
        ],
      },
      {
        heading: '2. Objeto',
        paragraphs: [
          'Este sitio web tiene por objeto facilitar información general sobre la actividad de PINTZEPOL, S.L.U., dedicada a recubrimientos industriales, incluida la aplicación de pintura líquida y pintura en polvo, así como permitir el contacto para solicitudes de presupuesto y consultas relacionadas con dichos servicios.',
          'El acceso y uso de este sitio web atribuyen la condición de usuario e implican la aceptación de este aviso legal. Si no está de acuerdo con su contenido, debe abstenerse de utilizar el sitio.',
        ],
      },
      {
        heading: '3. Condiciones de uso',
        paragraphs: [
          'El usuario se compromete a utilizar el sitio web de forma diligente, correcta y lícita, y a no emplearlo para fines contrarios a la ley, a la buena fe o al orden público.',
          'Queda prohibido utilizar el sitio de forma que pueda dañar, inutilizar, sobrecargar o deteriorar el funcionamiento de la web, o impedir el uso normal por parte de otros usuarios.',
          'La información publicada tiene carácter informativo. PINTZEPOL, S.L.U. podrá modificar, actualizar o eliminar contenidos, estructura o presentación del sitio sin necesidad de aviso previo, cuando resulte necesario para su mantenimiento o mejora.',
        ],
      },
      {
        heading: '4. Propiedad intelectual e industrial',
        paragraphs: [
          'Los textos, imágenes, vídeos, logotipos, diseño, código fuente y demás elementos de este sitio web son titularidad de PINTZEPOL, S.L.U. o se utilizan con la autorización de sus respectivos titulares, y están protegidos por la normativa de propiedad intelectual e industrial.',
          'Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otro uso no autorizado, salvo consentimiento expreso del titular o disposición legal que lo permita.',
        ],
      },
      {
        heading: '5. Responsabilidad',
        paragraphs: [
          'PINTZEPOL, S.L.U. procura que la información del sitio sea veraz y esté actualizada, pero no garantiza la ausencia de errores, omisiones o desactualizaciones, ni la disponibilidad ininterrumpida del sitio.',
          'El titular no se responsabiliza de los daños y perjuicios que puedan derivarse del uso inadecuado del sitio, de fallos de conectividad, de la presencia de virus u otros elementos lesivos introducidos por terceros, ni de los contenidos de sitios web de terceros a los que se pueda acceder mediante enlaces, si los hubiera.',
          'Las solicitudes de presupuesto y cualquier relación comercial se formalizarán por los canales de contacto indicados. La información de la web no constituye, por sí sola, una oferta vinculante salvo que así se indique de forma expresa.',
        ],
      },
      {
        heading: '6. Protección de datos y cookies',
        paragraphs: [
          'El tratamiento de datos personales se rige por la Política de privacidad de este sitio. El uso de cookies y tecnologías similares se describe en la Política de cookies.',
        ],
      },
      {
        heading: '7. Legislación y jurisdicción',
        paragraphs: [
          'Este aviso legal se rige por la legislación española. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales de Rubí (Barcelona), salvo que una norma de derecho necesario disponga otro fuero.',
        ],
      },
    ],
  },
  privacidad: {
    id: 'privacidad',
    title: 'Política de privacidad',
    updated: lastUpdate,
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        paragraphs: [
          'El responsable del tratamiento de los datos personales es:',
        ],
        list: [
          `Identidad: ${company.legalName}`,
          `NIF/CIF: ${company.nif}`,
          `Domicilio: ${company.address}`,
          `Correo electrónico para protección de datos: ${company.email}`,
          `Teléfono: ${company.phoneDisplay}`,
        ],
      },
      {
        heading: '2. Finalidades y base jurídica',
        paragraphs: [
          'Los datos personales se tratan únicamente para las siguientes finalidades:',
        ],
        list: [
          'Atender solicitudes de presupuesto, consultas o comunicaciones enviadas a través del correo electrónico o del teléfono publicados en la web. Base jurídica: adopción de medidas precontractuales a petición del interesado y, en su caso, ejecución de una relación contractual (artículo 6.1.b del RGPD).',
          'Gestionar el contacto profesional derivado de dichas solicitudes. Base jurídica: artículo 6.1.b del RGPD y, cuando proceda, el interés legítimo en mantener la comunicación comercial o técnica iniciada por el usuario (artículo 6.1.f del RGPD).',
          'Cumplir obligaciones legales aplicables a la actividad de la empresa (artículo 6.1.c del RGPD).',
          'Garantizar la seguridad y el mantenimiento técnico del sitio web, incluyendo los datos de conexión que el servidor pueda registrar de forma automática (como dirección IP, fecha y hora de acceso o tipo de navegador). Base jurídica: interés legítimo en la seguridad del servicio (artículo 6.1.f del RGPD).',
          'Mostrar el mapa de ubicación embebido de Google Maps, solo si el usuario lo acepta. Base jurídica: consentimiento (artículo 6.1.a del RGPD y artículo 22.2 de la LSSI-CE).',
        ],
      },
      {
        heading: '3. Datos tratados',
        paragraphs: [
          'Esta web no dispone de un formulario de recogida de datos. Los datos se obtienen cuando el usuario se pone en contacto con PINTZEPOL, S.L.U. por correo electrónico o teléfono, o cuando navega por el sitio.',
          'Según el caso, pueden tratarse: nombre y apellidos o razón social, datos de contacto (correo electrónico y teléfono), contenido del mensaje o de la solicitud de presupuesto, y datos técnicos de navegación o conexión imprescindibles para el funcionamiento del sitio. Si acepta el mapa de Google Maps, Google puede tratar datos técnicos de su dispositivo y de su interacción con el mapa, según su propia política de privacidad.',
          'No se solicitan categorías especiales de datos. Le rogamos que no envíe información innecesaria para la gestión de su consulta o presupuesto.',
        ],
      },
      {
        heading: '4. Conservación',
        paragraphs: [
          'Los datos se conservarán durante el tiempo necesario para atender la solicitud y, después, durante los plazos legales que resulten de aplicación en materia mercantil, fiscal o de responsabilidad. Los datos técnicos de conexión se conservarán el tiempo mínimo preciso para fines de seguridad y mantenimiento.',
        ],
      },
      {
        heading: '5. Destinatarios y transferencias',
        paragraphs: [
          'PINTZEPOL, S.L.U. no cede datos a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio (por ejemplo, proveedores tecnológicos que presten alojamiento o mantenimiento del sitio, actuando como encargados del tratamiento y con las garantías exigidas por el RGPD).',
          'Si el usuario acepta cargar el mapa de ubicación, el contenido se sirve desde Google Maps (Google Ireland Limited). Google puede tratar datos de conexión y establecer cookies propias. Esa carga no se produce de forma automática: el iframe solo se inserta tras el consentimiento. Puede consultar la información de Google en https://policies.google.com/privacy y https://policies.google.com/technologies/cookies.',
          'El uso de Google Maps puede implicar transferencias internacionales de datos, en particular a Estados Unidos, con las garantías que Google declare aplicables. Si no acepta el mapa, podrá consultar la dirección publicada y abrir Google Maps en una pestaña nueva, sin que esta web cargue el servicio embebido.',
        ],
      },
      {
        heading: '6. Derechos de las personas interesadas',
        paragraphs: [
          'Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar el consentimiento cuando este sea la base del tratamiento, dirigiéndose a PINTZEPOL, S.L.U. en la dirección postal indicada o en el correo electrónico info@pintzepol.com, indicando la referencia «Protección de datos» y acreditando su identidad.',
          'También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que el tratamiento no se ajusta a la normativa. Más información en https://www.aepd.es.',
        ],
      },
      {
        heading: '7. Decisiones automatizadas y menores',
        paragraphs: [
          'No se realizan decisiones individuales automatizadas ni elaboración de perfiles con efectos jurídicos o de impacto similar.',
          'Este sitio no está dirigido a menores de 14 años. Si se detecta que se han facilitado datos de un menor sin la autorización correspondiente, se procederá a su supresión.',
        ],
      },
      {
        heading: '8. Medidas de seguridad y actualizaciones',
        paragraphs: [
          'PINTZEPOL, S.L.U. aplica las medidas técnicas y organizativas adecuadas para proteger los datos personales frente a accesos no autorizados, pérdida o tratamiento ilícito, de acuerdo con el estado de la técnica y los riesgos del tratamiento.',
          'Esta política podrá actualizarse para adaptarla a cambios legales o del sitio web. La fecha de la última actualización figura al inicio del documento.',
        ],
      },
    ],
  },
  cookies: {
    id: 'cookies',
    title: 'Política de cookies',
    updated: lastUpdate,
    sections: [
      {
        heading: '1. Qué son las cookies',
        paragraphs: [
          'Las cookies son pequeños archivos que se descargan en el dispositivo del usuario al acceder a determinadas páginas web, y que permiten almacenar y recuperar información sobre su navegación. También se emplean tecnologías similares, como el almacenamiento local del navegador (localStorage).',
          'Esta política se formula conforme al artículo 22.2 de la LSSI-CE, al RGPD, a la Ley Orgánica 3/2018 (LOPDGDD) y a la Guía sobre el uso de cookies de la Agencia Española de Protección de Datos.',
        ],
      },
      {
        heading: '2. Cookies utilizadas en este sitio',
        paragraphs: [
          'Esta web utiliza cookies o tecnologías equivalentes técnicas, necesarias para el funcionamiento del sitio, y puede cargar cookies de terceros de Google Maps únicamente si el usuario lo acepta. No se emplean cookies propias de análisis, publicidad o redes sociales.',
          'Las cookies técnicas están exceptuadas del deber de recabar un consentimiento previo, de acuerdo con el artículo 22.2 de la LSSI-CE, sin perjuicio del deber de información. Las cookies de Google Maps no se cargan hasta que el usuario pulsa «Aceptar mapa» o «Mostrar mapa».',
        ],
        list: [
          'Nombre: pintzepol-cookie-notice. Tipo: técnica / necesaria. Titular: PINTZEPOL, S.L.U. Finalidad: recordar que el usuario ha leído o cerrado el aviso de cookies. Duración: persistente (se conserva en el navegador hasta que el usuario la elimine). Tecnología: almacenamiento local del navegador.',
          'Nombre: pintzepol-cookie-consent. Tipo: técnica / necesaria. Titular: PINTZEPOL, S.L.U. Finalidad: recordar si el usuario ha elegido solo cookies necesarias o ha aceptado cargar el mapa de Google Maps. Duración: persistente (se conserva en el navegador hasta que el usuario la elimine). Tecnología: almacenamiento local del navegador.',
          'Google Maps (embebido). Tipo: de terceros / no necesaria. Titular: Google Ireland Limited. Finalidad: mostrar el mapa de la ubicación de PINTZEPOL, S.L.U. en Rubí. Se carga solo tras consentimiento. Google puede instalar cookies propias y tratar datos técnicos de navegación. Duración y detalle: los determina Google. Más información: https://policies.google.com/technologies/cookies',
        ],
      },
      {
        heading: '3. Base jurídica',
        paragraphs: [
          'El uso de cookies técnicas necesarias se fundamenta en el interés legítimo del responsable en garantizar el funcionamiento del sitio (artículo 6.1.f del RGPD) y en la excepción del artículo 22.2 de la LSSI-CE.',
          'La carga del mapa de Google Maps y de las cookies asociadas se basa en el consentimiento del usuario (artículo 6.1.a del RGPD y artículo 22.2 de la LSSI-CE). El consentimiento es voluntario, puede denegarse eligiendo «Solo necesarias» y no impide el uso del resto del sitio ni de los datos de contacto publicados.',
          'Si en el futuro se incorporaran cookies de medición de audiencia o de publicidad, se solicitará un consentimiento específico y se actualizará esta política.',
        ],
      },
      {
        heading: '4. Cómo gestionar o eliminar cookies',
        paragraphs: [
          'El usuario puede configurar su navegador para aceptar, bloquear o eliminar cookies y datos de almacenamiento local. La forma de hacerlo depende del navegador utilizado. A título orientativo:',
        ],
        list: [
          'Google Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.',
          'Mozilla Firefox: Ajustes > Privacidad y seguridad.',
          'Microsoft Edge: Configuración > Cookies y permisos de sitio.',
          'Safari: Ajustes > Safari > Privacidad y seguridad.',
        ],
        extraParagraphs: [
          'Si bloquea las cookies técnicas, es posible que algunas funciones del sitio no operen correctamente, incluida la posibilidad de recordar su elección sobre cookies.',
          'Si no acepta Google Maps, el mapa embebido no se mostrará. Podrá seguir viendo la dirección y abrir el mapa en el sitio de Google.',
        ],
      },
      {
        heading: '5. Actualizaciones',
        paragraphs: [
          'PINTZEPOL, S.L.U. puede modificar esta política cuando cambie la normativa o las cookies efectivamente utilizadas. Se recomienda consultarla periódicamente. La fecha de la última actualización figura al inicio del documento.',
          `Para cualquier consulta sobre cookies o protección de datos puede escribir a ${company.email}.`,
        ],
      },
    ],
  },
};

export const legalNav = [
  { id: 'aviso-legal', label: 'Aviso legal' },
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'cookies', label: 'Cookies' },
];
