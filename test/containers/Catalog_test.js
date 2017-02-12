/**
 * Created by xax on 12.02.2017.
 */
import {renderComponent, expect} from '../test_helper';
import Catalog from '../../src/containers/Catalog';

describe('Catalog',() => {
    let component;
    beforeEach(()=>{
        component = renderComponent(Catalog);
    });
    it('классы корректны',()=>{
        expect(component).to.have.class('container');
    });
    it('exist ProductList',()=>{
        expect(component.find('.product_list_container')).to.exist;
    });
    it('exist CatalogSidebar',()=>{
        expect(component.find('.catalog_sidebar')).to.exist;
    });
});