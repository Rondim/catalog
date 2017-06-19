const sidebarReduxState = {
  sidebarType: 'setter',
  order: ['itemType'],
  gaps: [0],
  menus: {
    itemType: {
      menuType: 'filter',
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
      multiselection: false
    },
    moveToCatalog: {
      menuType: 'button',
      menuName: 'в Каталог'
    }
  },
  dependencies: {
    itemType: {
      childMenus: { itemSubtype: true },
      parentMenus: false
    }
  }
};
