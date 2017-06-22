import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenuButton from '../../../src/components/sidebar/SidebarMenuButton';

describe('SidebarMenuButton', () => {
  let component, props,
  handleMouseEnter, handleMouseLeave;

  beforeEach(() => {
    handleMouseEnter = sinon.spy();
    handleMouseLeave = sinon.spy();
    props = {
      text: 'Серь, Коль, Цепи',
      selection: 'selected',
      active: true,
      blocked: false,
      handleMouseEnter,
      handleMouseLeave
    };
    component = renderComponent(SidebarMenuButton, props);
  });

  describe('rendering', () => {
    it('should render', () => {
      expect(component.get(0)).to.exist;
    });
    it('has class sidebar-menu-button', () => {
      expect(component).to.have.class('sidebar-menu-button');
    });
    it('should include proper text', () => {
      expect(component).to.contain('Серь, Коль, Цепи');
    });
    it('has disabled class when button not Active', () => {
      props = { ...props, active: false };
      component = renderComponent(SidebarMenuButton, props);
      expect(component).to.have.class('sidebar-menu-button-disabled');
    });
    it('has selected class when filter selected', () => {
      expect(component).to.have.class('sidebar-menu-button-selected');
    });
    it('has selectedNotByAll class when filter selected', () => {
      props = { ...props, selection: 'selectedNotByAll' };
      component = renderComponent(SidebarMenuButton, props);
      expect(component).to.have.class('sidebar-menu-button-selectedNotByAll');
    });
    it('has glyphicon lock when it blocked', () => {
      props = { ...props, blocked: true };
      component = renderComponent(SidebarMenuButton, props);
      expect(component.children('.glyphicon-lock').length).to.equal(1);
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
    it('not triggers handleMouseEnter & handleMouseLeave when active false', () => {
      props = { ...props, active: false };
      component = renderComponent(SidebarMenuButton, props);
      component.simulate('mouseEnter');
      component.simulate('mouseLeave');
      assert(handleMouseEnter.notCalled);
      assert(handleMouseLeave.notCalled);
    });
  });
});
