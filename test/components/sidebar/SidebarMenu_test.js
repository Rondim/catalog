import { renderComponent, expect } from '../../test_helper';
import SidebarMenu from '../../../src/components/sidebar/SidebarMenu';
import SidebarMenuPopup from '../../../src/components/sidebar/SidebarMenuPopup';
import SidebarMenuButton from '../../../src/components/sidebar/SidebarMenuButton';

describe('SidebarMenu', () => {
  let SidebarMenuButton, initialProps;
  beforeEach(() => {
      initialProps = {
      menuName: 'Тип изделия',
      menuId: 'ItemType',
      multiSelection: true,
      filterSelected: [],
      filters: [
        { name: 'Серьги', filterId: 'earrings' },
        { name: 'Кольца', filterId: 'rings' },
        { name: 'Браслеты', filterId: 'bands' }
      ]
    };
  });

  it('has a correct class', () => {
    additionalProps = {}
    expect(component).to.have.class('sidebar-menu');
  });
});
