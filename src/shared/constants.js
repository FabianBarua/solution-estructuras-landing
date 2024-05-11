export const ALL_SORTS = [
  {
    id: 0,
    name: 'Relevancia',
    type: 'default',
    inverted: false
  },
  {
    id: 1,
    name: 'Precio A>Z',
    type: 'price',
    inverted: false
  },
  {
    id: 2,
    name: 'Precio Z>A',
    type: 'price',
    inverted: true
  },
  {
    id: 3,
    name: 'Nombre A>Z',
    type: 'name',
    inverted: false
  },
  {
    id: 4,
    name: 'Nombre Z>A',
    type: 'name',
    inverted: true
  }
]

export const MAX_PER_PAGE = 20

export const ALL_PARAMS = {
  search: 'busqueda',
  categories: 'categoria',
  page: 'pagina',
  sortID: 'orden',
  limit: 'limite'
}

export const testProducts = {
  results: [
    {
      id: 1,
      shortName: 'Andamio',
      imgUrl: '/images/andamioWhite.jpg',
      price: 10.99
    },
    {
      id: 2,
      shortName: 'Andamio 2',
      imgUrl: '/images/andamioWhite.jpg',
      price: 15.99
    },
    {
      id: 3,
      shortName: 'Andamio 3',
      imgUrl: '/images/andamioWhite.jpg',
      price: 12.99
    },
    {
      id: 4,
      shortName: 'Andamio 4',
      imgUrl: '/images/andamioWhite.jpg',
      price: 9.99
    },
    {
      id: 5,
      shortName: 'Andamio 5',
      imgUrl: '/images/andamioWhite.jpg',
      price: 14.99
    },
    {
      id: 6,
      shortName: 'Andamio 6',
      imgUrl: '/images/andamioWhite.jpg',
      price: 11.99
    },
    {
      id: 7,
      shortName: 'Andamio 7',
      imgUrl: '/images/andamioWhite.jpg',
      price: 13.99
    },
    {
      id: 8,
      shortName: 'Andamio 8',
      imgUrl: '/images/andamioWhite.jpg',
      price: 16.99
    },
    {
      id: 9,
      shortName: 'Andamio 9',
      imgUrl: '/images/andamio.png',
      price: 8.99
    },
    {
      id: 10,
      shortName: 'Andamio 10',
      imgUrl: '/images/andamioWhite.jpg',
      price: 17.99
    }
  ]
}
