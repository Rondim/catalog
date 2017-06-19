props = {
  filters: {
    chains: {
      filterName: 'Цепи'
    },
    earrings: {
      filterName: 'Серьги'
    },
    rings: {
      filterName: 'Кольца'
    }
  },
  filtersOrder: ['earrings', 'rings', 'chains'],
  filtersSelected: {
    earrings: 'selected',
    rings: 'selectedNotByAll'
  },
  blocked: false,
  active: true,
  handleFilterClick: function() {},
  handleMouseEnter: function() {},
  handleMouseLeave: function() {}
];
