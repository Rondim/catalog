import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenuButton from '../../../src/components/sidebar/SidebarMenuButton';

describe('SidebarMenuButton', () => {
  let component, props,
  handleMouseEnter, handleMouseLeave;
  beforeEach(() => {
    handleMouseEnter = sinon.spy();
    handleMouseLeave = sinon.spy();
    props = {
      isActive: true,
      menuName: 'Тип изделия',
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ],
      filtersSelected: [],
      handleMouseEnter,
      handleMouseLeave
    };
    component = renderComponent(SidebarMenuButton, props);
  })

  describe('rendering', () => {
    it('should render', () => {
      expect(component.get(0)).to.exist;
    })
    it('has class sidebar-menu-button', () => {
      expect(component).to.have.class('sidebar-menu-button');
    });
    it('menu text when non selection', () => {
      expect(component).to.contain('Тип изделия');
    })
    it('one full name when one selected', () => {
      props = {...props, filtersSelected: ['earrings']};
      component = renderComponent(SidebarMenuButton, props);
      expect(component.text()).to.equal('Серьги');
    });
    it('list of cutted filter names when many selected', () => {
      props = {...props, filtersSelected: ['earrings', 'rings']};
      component = renderComponent(SidebarMenuButton, props);
      expect(component).to.contain('Серь, Коль');
    });
    it('has disabled class when button not Active', () => {
      props = {...props, isActive: false };
      component = renderComponent(SidebarMenuButton, props);
      expect(component).to.have.class('sidebar-menu-button-disabled');
    });
    it('has selected class when filter selected', () => {
      props = {...props, filtersSelected: ['earrings'] };
      component = renderComponent(SidebarMenuButton, props);
      expect(component).to.have.class('sidebar-menu-button-selected');
    });
  });
  describe('events', () => {
    it('triggers handleMouseEnter when entered', () => {
      component.simulate('mouseEnter');
      assert(handleMouseEnter.called);
    });
    it('triggers handleMouseLeave when leave', () => {
      component.simulate('mouseLeave');
      assert(handleMouseLeave.called);
    });
    it('not triggers handleMouseEnter when isActive false', () => {
      props = {...props, isActive: false };
      component = renderComponent(SidebarMenuButton, props);
      component.simulate('mouseEnter');
      assert(handleMouseEnter.notCalled);
    });
    it('not triggers handleMouseLeave when isActive false', () => {
      props = {...props, isActive: false };
      component = renderComponent(SidebarMenuButton, props);
      component.simulate('mouseLeave');
      assert(handleMouseLeave.notCalled);
    });
  });
});
