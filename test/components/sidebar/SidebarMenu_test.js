import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenu from '../../../src/components/sidebar/SidebarMenu';

describe('SidebarMenu', () => {
  let component, props;
  beforeEach(() => {
    props = {
      isActive: true,
      menuName: 'Тип изделия',
      multiSelection: true,
      filtersSelected: [],
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ]
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
  });
});
