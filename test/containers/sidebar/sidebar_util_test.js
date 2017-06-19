// import { renderComponent, expect, assert, sinon } from '../../test_helper';
// import { calcSelectedFilters } from '../../../src/containers/utils/sidebar_util.js';
//
// // describe('sidebar_util', () => {
// //   let prevSelection, filters, filterClicked, multiselection,
// //   testCall = () => calcSelectedFilters(prevSelection, filters, filterClicked, multiselection);
// //   beforeEach(() => {
// //     prevSelection = [
// //       { filterId: 'rings', selection: 'selected' }
// //     ];
// //     filters = [
// //       { name: 'Серьги', filterId: 'earrings' },
// //       { name: 'Кольца', filterId: 'rings' },
// //       { name: 'Браслеты', filterId: 'bands' }
// //     ];
// //     filterClicked = { menuId: 'itemType', filterId: 'earrings' };
// //     multiselection = false;
// //   });
// //
// //   it('should not error if there is filterClicked in menu filters', () => {
// //     expect(testCall).to.not.throw();
// //   });
// //   it('should error if there is not filterClicked in menu filters', () => {
// //     filterClicked = { ...filterClicked, filterId: 'fakeId' };
// //     expect(testCall).to.throw();
// //   });
// //   it('should select one filter when multiselection is false', () => {
// //     expect(testCall()).to.eql([{ filterId: 'earrings', selection: 'selected' }]);
// //   });
// //   it('should add SELECTED selection on filterClicked when multiselection is true', () => {
// //     multiselection = true;
// //     prevSelection = [ ...prevSelection, { filterId: 'earrings', selection: 'selectedNotByAll' }];
// //     expect(testCall()).to.eql([
// //       { filterId: 'rings', selection: 'selected' },
// //       { filterId: 'earrings', selection: 'selected' }
// //     ]);
// //
// //   });
// // });
