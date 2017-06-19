import { renderComponent, expect, assert, sinon } from '../../test_helper';
import CatalogSideBar from '../../../src/containers/CatalogSideBar';

describe('CatalogSideBar', () => {
  let component, state;
  beforeEach(() => {
    state = {
      catalog: {}
    };
    state.catalog.sidebar = {
      sidebarType: 'setter',
      order: ['itemType', 'itemSubtype'],
      gaps: [0, 0],
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
        itemSubtype: {
          menuType: 'filter',
          filters: {
            plates: {
              filterName: 'Пластины',
              dependentOn: { earrings: true }
            },
            kongo: {
              filterName: 'Конго',
              dependentOn: { earrings: true }
            },
            wedding: {
              filterName: 'Обручальные',
              dependentOn: { rings: true }
            },
            engagement: {
              filterName: 'Помолвочные',
              dependentOn: { rings: true }
            },
            love: {
              filterName: 'Лав',
              dependentOn: { chains: true }
            },
            nonna: {
              filterName: 'Нонна',
              dependentOn: { chains: true }
            }
          },
          filtersOrder: ['plates', 'kongo', 'wedding','engagement', 'love', 'nonna'],
          filtersSelected: {},
          menuName: 'Подтип изделия',
          menuId: 'itemSubtype',
          blocked: false,
          active: true,
          multiselection: false
        }
      },
      dependencies: {
        itemType: {
          childMenus: { itemSubtype: true },
          parentMenus: false
        },
        itemSubtype: {
          childMenus: false,
          parentMenus: { itemType: true }
        }
      }
    };
    component = renderComponent(CatalogSideBar, null, state);
  });
  it('should exist', () => {
    expect(component.get(0)).to.exist;
  });
});
