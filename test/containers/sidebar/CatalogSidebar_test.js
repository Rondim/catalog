import { renderComponent, expect, assert, sinon } from '../../test_helper';
import CatalogSideBar from '../../../src/containers/CatalogSideBar';
import { calcShowItems, calcCatalogSidebarState } from '../../../src/containers/CatalogSideBar';

describe('CatalogSideBar', () => {
  let component, state, cState, sidebarState;
  beforeEach(() => {
    state = {
      catalog: {}
    };
    state.catalog.sidebar = {
      sidebarType: 'setter',
      order: ['itemType', 'itemSubtype', 'sizes'],
      gaps: [0, 0, 0],
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
          filtersSelected: {},
          menuName: 'Тип Изделия',
          menuId: 'itemType',
          blocked: false,
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
          filtersOrder: ['plates', 'kongo', 'wedding', 'engagement', 'love', 'nonna'],
          filtersSelected: {},
          menuName: 'Подтип изделия',
          menuId: 'itemSubtype',
          blocked: false,
          multiselection: false
        },
        sizes: {
          menuType: 'filter',
          filters: {
            s16: {
              filterName: '16',
              dependentOn: { wedding: true }
            },
            s16_5: {
              filterName: '16.5',
              dependentOn: { wedding: true }
            },
            s40: {
              filterName: '40',
              dependentOn: { chains: true }
            },
            s45: {
              filterName: '45',
              dependentOn: { chains: true }
            }
          },
          filtersOrder: ['s16', 's16_5', 's40', 's45'],
          filtersSelected: {},
          menuName: 'Подтип изделия',
          menuId: 'sizes',
          blocked: false,
          multiselection: false
        }
      },
      dependencies: {
        itemType: {
          childMenus: { itemSubtype: true },
          parentMenus: false
        },
        itemSubtype: {
          childMenus: { sizes: true },
          parentMenus: { itemType: true }
        },
        sizes: {
          childMenus: false,
          parentMenus: { itemSubtype: true }
        }
      }
    };
  });
  describe('rendering', () => {
    beforeEach(() => {
      component = renderComponent(CatalogSideBar, null, state);
    });
    it('should exist', () => {
      expect(component.get(0)).to.exist;
    });
  });


  describe('calculateProps', () => {
    beforeEach(() => {
      cState = { ...state };
    });
    it('should remove all filters of child objects if parent is not selected', () => {
      const { menus, dependencies, order } = cState.catalog.sidebar;
      const output = calcShowItems(menus, dependencies, order);
      expect(Object.keys(output.itemType.filters).length).to.equal(3);
      expect(Object.keys(output.itemSubtype.filters).length).to.equal(0);
      expect(Object.keys(output.sizes.filters).length).to.equal(0);
    });
    it('should show 1st dependent items if parent selected', () => {
      const { menus, dependencies, order } = cState.catalog.sidebar;
      menus['itemType']['filtersSelected'] = { rings: 'selected' };
      const output = calcShowItems(menus, dependencies, order);
      expect(Object.keys(output.itemType.filters).length).to.equal(3);
      expect(Object.keys(output.itemSubtype.filters).length).to.equal(2);
      expect(Object.keys(output.sizes.filters).length).to.equal(0);
    });
    it('should not show 1st dependent items if parent selected twice', () => {
      const { menus, dependencies, order } = cState.catalog.sidebar;
      menus['itemType']['filtersSelected'] = { rings: 'selected', earrings: 'selected' };
      const output = calcShowItems(menus, dependencies, order);
      expect(Object.keys(output.itemType.filters).length).to.equal(3);
      expect(Object.keys(output.itemSubtype.filters).length).to.equal(0);
      expect(Object.keys(output.sizes.filters).length).to.equal(0);
    });
    it('should show 1st, 2nd dependent items if parents selected', () => {
      const { menus, dependencies, order } = cState.catalog.sidebar;
      menus['itemType']['filtersSelected'] = { rings: 'selected' };
      menus['itemSubtype']['filtersSelected'] = { wedding: 'selected' };
      const output = calcShowItems(menus, dependencies, order);
      expect(Object.keys(output.itemType.filters).length).to.equal(3);
      expect(Object.keys(output.itemSubtype.filters).length).to.equal(2);
      expect(Object.keys(output.sizes.filters).length).to.equal(2);
    });
  });

  describe('calcCatalogSidebarState', () => {
    beforeEach( ()=> {
      sidebarState = { ...state.catalog.sidebar };
    });
    it('works with one selected', () => {
      const output = calcCatalogSidebarState({
        menuId: 'itemType',
        filtersSelected: { rings: 'selected' }
        }, sidebarState);
      expect(output.menus.itemType.filtersSelected).to.eql({ rings: 'selected' });
    });
    it('works with two selected', () => {
      const output1 = calcCatalogSidebarState({
        menuId: 'itemType',
        filtersSelected: { rings: 'selected' }
        }, sidebarState);
      const output2 = calcCatalogSidebarState({
        menuId: 'itemSubtype',
        filtersSelected: { wedding: 'selected' }
      }, output1);
      expect(output2.menus.itemType.filtersSelected).to.eql({ rings: 'selected' });
      expect(output2.menus.itemSubtype.filtersSelected).to.eql({ wedding: 'selected' });
    });
    it('works with parent changed', () => {
      const output1 = calcCatalogSidebarState({
        menuId: 'itemType',
        filtersSelected: { rings: 'selected' }
        }, sidebarState);
      const output2 = calcCatalogSidebarState({
        menuId: 'itemSubtype',
        filtersSelected: { wedding: 'selected' }
      }, output1);
      const output3 = calcCatalogSidebarState({
        menuId: 'itemType',
        filtersSelected: { earrings: 'selected' }
      }, output2);
      expect(output3.menus.itemType.filtersSelected).to.eql({ earrings: 'selected' });
      expect(output3.menus.itemSubtype.filtersSelected).to.eql({ });
    });
  });
});
