/**
 * Created by xax on 12.02.2017.
 */
import {renderComponent, expect} from '../test_helper';
import ProductList from '../../src/components/ProductList';

describe('ProductList',() => {
    let component;
    beforeEach(()=>{
        component = renderComponent(ProductList);
    });
    it('классы корректны',()=>{
        expect(component).to.have.class('product_list_container');
    });
    it('exist ul',()=>{
        expect(component.find('.product_list')).to.exist;
    });
});