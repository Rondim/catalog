import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenu from '../../../src/components/sidebar/SidebarMenu';

describe('SidebarMenu', () => {
  let component, props,
  handleMenuSelect;

  beforeEach(() => {
    handleMenuSelect = sinon.spy();
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
      filtersSelected: {},
      menuName: 'Тип Изделия',
      menuId: 'itemType',
      blocked: false,
      active: true,
      multiselection: false,
      handleMenuSelect
    };
    component = renderComponent(SidebarMenu, props);
  });

  describe('rendering', () => {
    it('should exist', () => {
      expect(component.get(0)).to.exist;
    });
    //Заменить на нормальные тесты с установкой состояние isPopupShow
    it('should not render popup in common', () => {
      expect(component.find('.sidebar-menu-popup')[0]).to.not.exist;
    });
    it('should render popup on MouseEnter', () => {
      component.children('button').eq(0).simulate('mouseEnter');
      expect(component.find('.sidebar-menu-popup')[0]).to.exist;
    });
    it('should not render popup on MouseLeave', () => {
      component.children('button').eq(0).simulate('mouseEnter');
      component.children('button').eq(0).simulate('mouseLeave');
      expect(component.find('.sidebar-menu-popup')[0]).to.not.exist;
    });
    it('menu text when non selection', () => {
      expect(component.children('.sidebar-menu-button').eq(0)).to.contain('Тип Изделия');
    });
    it('one full name when one selected and class selected', () => {
      props = {...props, filtersSelected: { earrings: 'selected' }};
      component = renderComponent(SidebarMenu, props);
      expect(component.children('.sidebar-menu-button').eq(0)).to.contain('Серьги');
      expect(component.find('.sidebar-menu-button')[0].className).
        to.contain('sidebar-menu-button-selected');
    });
    it('list of cutted filter names when many selected and class selectedNotByAll', () => {
      props = {...props, filtersSelected: {
        earrings: 'selected',
        rings: 'selectedNotByAll'
      }};
      component = renderComponent(SidebarMenu, props);
      expect(component.children('.sidebar-menu-button')).to.contain('Серь, Коль');
      expect(component.find('.sidebar-menu-button')[0].className).
        to.contain('sidebar-menu-button-selectedNotByAll');
    });
  });

  describe('events', () => {
    it('correct handleMenuSelect when one selected', () => {
      component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
      component.find('.sidebar-menu-popup-button').eq(0).simulate('click');
      assert(handleMenuSelect.called);
      assert(handleMenuSelect.calledWithMatch({
        menuId: 'itemType',
        filtersSelected: {
          earrings: 'selected'
        }
      }));
    });
    it('correct handleMenuSelect when selected is clicked', () => {
      props = {...props, filtersSelected: {
        earrings: 'selected',
      }};
      component = renderComponent(SidebarMenu, props);
      component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
      component.find('.sidebar-menu-popup-button').eq(0).simulate('click');
      assert(handleMenuSelect.calledWithMatch({
        menuId: 'itemType',
        filtersSelected: {}
      }));
    });
    it('correct handleMenuSelect when not multi clicked another filter', () => {
      props = {...props, filtersSelected: {
        earrings: 'selected',
      }};
      component = renderComponent(SidebarMenu, props);
      component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
      component.find('.sidebar-menu-popup-button').eq(1).simulate('click');
      assert(handleMenuSelect.calledWithMatch({
        menuId: 'itemType',
        filtersSelected: {
          rings: 'selected'
        }
      }));
    });
    it('correct handleMenuSelect when multi clicked selectedNotByAll', () => {
      props = {...props, multiselection: true, filtersSelected: {
        earrings: 'selected',
        rings: 'selectedNotByAll'
      }};
      component = renderComponent(SidebarMenu, props);
      component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
      component.find('.sidebar-menu-popup-button').eq(1).simulate('click');
      assert(handleMenuSelect.calledWithMatch({
        menuId: 'itemType',
        filtersSelected: {
          earrings: 'selected',
          rings: 'selected'
        }
      }));
    });
    it('correct handleMenuSelect when multi clicked notSelected', () => {
      props = {...props, multiselection: true, filtersSelected: {
        earrings: 'selected',
        rings: 'selectedNotByAll'
      }};
      component = renderComponent(SidebarMenu, props);
      component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
      component.find('.sidebar-menu-popup-button').eq(2).simulate('click');
      assert(handleMenuSelect.calledWithMatch({
        menuId: 'itemType',
        filtersSelected: {
          earrings: 'selected',
          rings: 'selectedNotByAll',
          chains: 'selected'
        }
      }));
    });
  });
});
