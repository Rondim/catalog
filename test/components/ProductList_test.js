// /**
//  * Created by xax on 12.02.2017.
//  */
// import {renderComponent, expect} from '../test_helper';
// import ProductList from '../../src/components/ProductList';
//
// describe('ProductList',() => {
//     let component;
//     beforeEach(()=>{
//         const props = {
//             ProductList: {
//                 items: {
//                     item1: {url: 'https://someurl2'},
//                     item2: {url: 'https://someurl2'}
//                 }
//             }
//         };
//         component = renderComponent(ProductList,null,props);
//     });
//     it('классы корректны',()=>{
//         expect(component).to.have.class('product_list_container');
//     });
//     it('exist ul',()=>{
//         expect(component.find('.product_list')).to.exist;
//     });
//     it('shows an li for each item',()=>{
//         expect (component.find('li').length).to.equal(0);
//     });
// });
