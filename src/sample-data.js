export const decisions = [
  {
    id: '900',
    title: 'Dinner',
    completed: false,
    members: [
      {
        id: '100',
        first_name: 'Elina',
        last_name: 'Goldin'
      }
    ],
    options: [],
    limits: {
      vote_max: null,
      vote_min: null,
      veto_max: null,
      veto_min: null
    },
    url: '/900'
  },
  {
    id: '911',
    title: 'Movies',
    completed: false,
    members: [
      {
        id: '100',
        first_name: 'Elina',
        last_name: 'Goldin'
      },
      {
        id: '111',
        first_name: 'Winston',
        last_name: 'Bishop'
      },
      {
        id: '122',
        first_name: 'Nick',
        last_name: 'Miller'
      },
      {
        id: '133',
        first_name: 'Schmidt',
        last_name: 'Schmidt'
      }
    ],
    options: [],
    limits: {
      vote_max: null,
      vote_min: null,
      veto_max: null,
      veto_min: null
    },
    url: '/911'
  },
  {
    id: '922',
    title: 'Lunch',
    completed: true,
    outcome: ['Ramen', 'Indian', 'Pizza'],
    members: [
      {
        id: '100',
        first_name: 'Elina',
        last_name: 'Goldin'
      },
      {
        id: '111',
        first_name: 'Winston',
        last_name: 'Bishop'
      },
      {
        id: '122',
        first_name: 'Nick',
        last_name: 'Miller'
      },
      {
        id: '133',
        first_name: 'Something',
        last_name: 'Schmidt'
      }
    ],
    options: [],
    limits: {
      vote_max: null,
      vote_min: null,
      veto_max: null,
      veto_min: null
    },
    url: '/922'
  }
];

export const currentUser = {
  id: '100',
  first_name: 'Elina',
  last_name: 'Goldin'
};
