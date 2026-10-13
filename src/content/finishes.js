const finishes = [
  {
    id: 'liso',
    name: 'Liso',
    image: `${import.meta.env.BASE_URL}image/acabados/liso.webp`,
  },
  {
    id: 'mate',
    name: 'Mate',
    image: `${import.meta.env.BASE_URL}image/acabados/mate.png`,
  },
  {
    id: 'satinado',
    name: 'Satinado',
    image: `${import.meta.env.BASE_URL}image/acabados/satinado.png`,
  },
  {
    id: 'brillante',
    name: 'Brillante',
    image: `${import.meta.env.BASE_URL}image/acabados/brillante.png`,
  },
  {
    id: 'gofrado',
    name: 'Gofrado',
    image: `${import.meta.env.BASE_URL}image/acabados/gofrado.webp`,
  },
  {
    id: 'perlado',
    name: 'Perlado',
  },
  {
    id: 'metalizado',
    name: 'Metalizado',
    image: `${import.meta.env.BASE_URL}image/acabados/metalizado.png`,
  },
  {
    id: 'efecto-forja',
    name: 'Efecto forja',
    image: `${import.meta.env.BASE_URL}image/acabados/forja.png`,
  },
  {
    id: 'texturado',
    name: 'Texturado',
    image: `${import.meta.env.BASE_URL}image/acabados/texturado.png`,
  },
  {
    id: 'microtexturado',
    name: 'Microtexturado',
    image: `${import.meta.env.BASE_URL}image/acabados/microtexturado.png`,
  },
];

export const finishGroups = {
  powder: {
    title: 'ACABADOS PINTURA EN POLVO',
    titleLines: ['ACABADOS', 'PINTURA EN', 'POLVO'],
    items: finishes,
  },
  liquid: {
    title: 'ACABADOS PINTURA LÍQUIDA',
    titleLines: ['ACABADOS', 'PINTURA', 'LÍQUIDA'],
    items: finishes,
  },
};
