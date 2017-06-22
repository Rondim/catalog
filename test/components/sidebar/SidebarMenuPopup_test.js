import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenuPopup from '../../../src/components/sidebar/SidebarMenuPopup';

describe('SidebarMenuPopup', () => {
  let component, props,
  handleFilterClick, handleMouseEnter, handleMouseLeave;
  beforeEach(() => {
    handleFilterClick = sinon.spy();
    handleMouseEnter = sinon.spy();
    handleMouseLeave = sinon.spy();
    props = {
      filters: {
        chains: { filterName: 'Цепи' },
        earrings: { filterName: 'Серьги' },
        rings: { filterName: 'Кольца' }
      },
      filtersToShow: ['earrings', 'rings', 'chains'],
      filtersSelected: { },
      handleFilterClick,
      handleMouseEnter,
      handleMouseLeave
    };
    component = renderComponent(SidebarMenuPopup, props);
  });
  describe('rendering', () => {
    it('should not render filters when filtersToShow is []', () => {
      props = { ...props, filtersToShow: [] };
      component = renderComponent(SidebarMenuPopup, props);
      expect(component.get(0)).to.exist;
    });
    it('should render', () => {
      expect(component.get(0)).to.exist;
    });
    it('renders filters not selected', () => {
      expect(component.find('button')[0].className).to.contain('default');
    });
    it('renders selection for selected filters', () => {
      props.filtersSelected = {
        earrings: 'selected'
      };
      component = renderComponent(SidebarMenuPopup, props);
      expect(component.find('button')[0].className).to.contain('primary');
    });
    it('renders selection for selectedNotByAll filters', () => {
      props.filtersSelected = {
        earrings: 'selectedNotByAll'
      };
      component = renderComponent(SidebarMenuPopup, props);
      expect(component.find('button')[0].className).to.contain('warning');
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
    it('triggers handleFilterClick with filter clicked', () => {
      component.children('button').eq(0).simulate('click');
      assert(handleFilterClick.calledWithMatch('earrings'));
    });
  });
});
