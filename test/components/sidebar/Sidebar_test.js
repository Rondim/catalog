import { renderComponent, expect, assert, sinon } from '../../test_helper';
import Sidebar from '../../../src/components/sidebar/Sidebar';

describe('Sidebar', () => {
  let props, component,
  handleMenuSelect;
  beforeEach(() => {
    handleMenuSelect = sinon.spy();
    props = {
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
          menuName: 'Подтип изделия',
          menuId: 'itemSubtype',
          blocked: false,
          multiselection: false
        }
      },
      filtersSelected: {
        itemType: {
          earrings: 'selected',
          rings: 'selectedNotByAll'
        },
        itemSubtype: { }
      },
      filtersToShow: {
        itemType: ['earrings', 'rings', 'chains'],
        itemSubtype: []
      },
      handleMenuSelect
    };
    component = renderComponent(Sidebar, props);
  });
  describe('rendering', () => {
    it('should exist', () => {
      expect(component.get(0)).to.exist;
    });
    it('should render menus', () => {
      expect(component.children('.sidebar-menu').length).to.equal(2);
    });
    it('should not render menus when is empty ', () => {
      props = { ...props, order: [], menus: {} };
      component = renderComponent(Sidebar, props);
      expect(component.get(0)).to.exist;
      expect(component.children('.sidebar-menu').length).to.equal(0);
    });
  });
  it('should invoke filter click handler', () => {
    // show popup
    component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
    // simulate click on filter earrings
    component.find('.sidebar-menu-popup-button').eq(0).simulate('click');
    assert(handleMenuSelect.calledWithMatch({
      menuId: 'itemType',
      filtersSelected: { earrings: 'selected' }
    }));
  });
});
