import { renderComponent, expect, assert, sinon } from '../../test_helper';
import SidebarMenuPopup from '../../../src/components/sidebar/SidebarMenuPopup';

describe('SidebarMenuPopup', () => {
  let component, props;
  beforeEach(() => {
    props = {
      multiSelection: true,
      filtersSelected: [],
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ]
    };
    component = renderComponent(SidebarMenuPopup, props);
  });
  describe('rendering', () => {
    it('should render', () => {
      expect(component.get(0)).to.exist;
    });
    it('renders filters not selected', () => {
      expect(component).to.contain('Серьги');
      expect(component).to.contain('Кольца');
      expect(component).to.contain('Браслеты');
      expect(component.find('button')[0].className).to.contain('default');
      expect(component.find('button')[1].className).to.contain('default');
      expect(component.find('button')[2].className).to.contain('default');
    });
    it('renders selection for selected filters', () => {
      props.filtersSelected = ['earrings', 'rings'];
      component = renderComponent(SidebarMenuPopup, props);
      expect(component.find('button')[0].className).to.contain('primary');
      expect(component.find('button')[1].className).to.contain('primary');
      expect(component.find('button')[2].className).to.contain('default');
    });
  });

  describe('mouse enter and leave', () => {
    it('should trigger handleMouseEnter when entered', () => {
      const handleMouseEnter = sinon.spy();
      props = { ...props, handleMouseEnter };
      component = renderComponent(SidebarMenuPopup, props);
      component.simulate('mouseEnter');
      assert(handleMouseEnter.called);
    });
    it('should trigger handleMouseLeave when leave', () => {
      const handleMouseLeave = sinon.spy();
      props = { ...props, handleMouseLeave };
      component = renderComponent(SidebarMenuPopup, props);
      component.simulate('mouseLeave');
      assert(handleMouseLeave.called);
    });
  });

  describe('multiSelection', () => {
    it('invokes handleFilterClick  with multiple selection', () => {
      const handleFilterClick = sinon.spy();
      props =  { ...props,
        filtersSelected: ['earrings'],
        handleFilterClick };
      component = renderComponent(SidebarMenuPopup, props);
      component.children('button').eq(1).simulate('click');
      assert(handleFilterClick.calledWithMatch(['earrings', 'rings']));
    });
    it('unselect when clicked on previously selected', () => {
      const handleFilterClick = sinon.spy();
      props =  { ...props,
        filtersSelected: ['earrings', 'rings', 'bands'],
        handleFilterClick };
      component = renderComponent(SidebarMenuPopup, props);
      component.children('button').eq(0).simulate('click');
      assert(handleFilterClick.calledWithMatch(['rings', 'bands']));
    });
  });

  describe('singleSelection', () => {
    it('invokes handleFilterClick with single selection', () => {
      const handleFilterClick = sinon.spy();
      props =  { ...props,
        multiSelection: false,
        filtersSelected: ['earrings'],
        handleFilterClick };
      component = renderComponent(SidebarMenuPopup, props);
      component.children('button').eq(1).simulate('click');
      assert(handleFilterClick.calledWithMatch(['rings']));
    });
  });
});
