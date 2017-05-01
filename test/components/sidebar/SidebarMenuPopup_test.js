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
      menuId: 'itemType',
      filtersSelected: [],
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ],
      handleFilterClick,
      handleMouseEnter,
      handleMouseLeave
    };
    component = renderComponent(SidebarMenuPopup, props);
  });
  describe('rendering', () => {
    it('should render', () => {
      expect(component.get(0)).to.exist;
    });
    it('renders filters not selected', () => {
      expect(component).to.contain('Серьги');
      expect(component.find('button')[0].className).to.contain('default');
    });
    it('renders selection for selected filters', () => {
      props.filtersSelected = ['earrings', 'rings'];
      component = renderComponent(SidebarMenuPopup, props);
      expect(component.find('button')[0].className).to.contain('primary');
      expect(component.find('button')[1].className).to.contain('primary');
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
    it('triggers handleFilterClick with menuId and filter clicked', () => {
      component.children('button').eq(0).simulate('click');
      assert(handleFilterClick.calledWithMatch({
        menuId: 'itemType',
        filterClicked: 'earrings'
      }));
    });
  });
});
