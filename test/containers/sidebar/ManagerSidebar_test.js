import { renderComponent, expect, assert, sinon } from '../../test_helper';
import ManagerSidebar from '../../../src/containers/sidebar/ManagerSidebar';

describe('ManagerSidebar', () => {
  let props, component;
  beforeEach(() => {
    component = renderComponent(ManagerSidebar);
  });

  it('should pass [] to Sidebar while data is not loaded', () => {
    expect(component).to.have.class('sidebar');
    expect(component.find('.sidebar-menu').length).to.equal(0);
  });
});
