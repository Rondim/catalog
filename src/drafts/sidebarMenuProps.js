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
  menuName: 'Тип Изделия',
  menuId: 'itemType',
  blocked: false,
  active: true,
  multiselection: false,
  handleMenuSelect: function() {}
]

ownMethods = {
  handleFilterClick: function() {}
  handleMouseEnter: function() {},
  handleMouseLeave: function() {},
}
