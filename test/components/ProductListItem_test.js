/**
 * Created by xax on 18.02.2017.
 */
import {renderComponent, expect} from '../test_helper';
import ProductListItem from '../../src/components/ProductListItem';

describe('ProductListItem',() => {
    let component;
    beforeEach(()=>{
        const props = {url: 'https://someurl'};
        component = renderComponent(ProductListItem,props);
    });
    it('классы корректны',()=>{
        expect(component).to.have.class('col-xs-3 product_item');
    });
    it('exist a',()=>{
        expect(component.find('.thumbnail')).to.exist;
    });
    it('shows a valid img',()=>{
        expect (component.find('img')).to.have.prop('src','https://someurl/');
    });
});