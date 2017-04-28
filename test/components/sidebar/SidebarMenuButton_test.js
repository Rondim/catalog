import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenuButton from '../../../src/components/sidebar/SidebarMenuButton';

describe('SidebarMenuButton', () => {
  let component, props;
  beforeEach(() => {
    props = {
      isActive: true,
      menuName: 'Тип изделия',
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ],
      filtersSelected: []
    };
    component = renderComponent(SidebarMenuButton, props);
  })

  describe('rendering', () => {
    it('should render', () => {
      expect(component.get(0)).to.exist;
    })
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
  describe('mouse enter and leave', () => {
    it('should trigger handleMouseEnter when entered', () => {
      const handleMouseEnter = sinon.spy();
      props = { ...props, handleMouseEnter };
      component = renderComponent(SidebarMenuButton, props);
      component.simulate('mouseEnter');
      assert(handleMouseEnter.called);
    });
    it('should trigger handleMouseLeave when leave', () => {
      const handleMouseLeave = sinon.spy();
      props = { ...props, handleMouseLeave };
      component = renderComponent(SidebarMenuButton, props);
      component.simulate('mouseLeave');
      assert(handleMouseLeave.called);
    });
  });
});
