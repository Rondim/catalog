import { renderComponent, expect, assert, sinon } from '../../test_helper';
import Sidebar from '../../../src/components/sidebar/Sidebar';

describe('Sidebar', () => {
  let props, component,
  handleFilterClick;
  beforeEach(() => {
    handleFilterClick = sinon.spy();
    props = {
      menus: [
        {
          isActive: true,
          menuName: 'Тип изделия',
          menuId: 'itemType',
          multiSelection: true,
          filters: [
            { name: 'Серьги', filterId: 'earrings' },
            { name: 'Кольца', filterId: 'rings' },
            { name: 'Браслеты', filterId: 'bands' }
          ],
          filtersSelected: []
        }, {
          isActive: true,
          menuName: 'Производитель',
          menuId: 'manufacturer',
          multiSelection: true,
          filters: [
            { name: 'Sokolov', filterId: 'sokolov' },
            { name: 'Delta', filterId: 'delta' },
            { name: 'Sanis', filterId: 'sanis' }
          ],
          filtersSelected: []
        }
      ],
      handleFilterClick
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
    it('should not render menus when is ', () => {
      props = {...props, menus: []};
      component = renderComponent(Sidebar, props);
      expect(component.get(0)).to.exist;
      expect(component.children('.sidebar-menu').length).to.equal(0);
    });
  });
  it('should invoke filter click handler', () => {
    //show popup
    component.find('.sidebar-menu-button').eq(0).simulate('mouseEnter');
    //simulate click on filter earrings
    component.find('.sidebar-menu-popup-filter-button').eq(0).simulate('click');
    assert(handleFilterClick.calledWithMatch({
      menuId: 'itemType',
      filterClicked: 'earrings'
    }));
  });
});
