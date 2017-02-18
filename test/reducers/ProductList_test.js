/**
 * Created by xax on 12.02.2017.
 */
import { expect } from '../test_helper';
import productlistReducer from '../../src/reducers/ProductList_reducer';
import { LOAD_ITEMS } from '../../src/actions/types';

describe('ProductList reducer',()=>{
    it('handles action with unknown type',()=>{
        expect(productlistReducer(undefined,{})).to.eql({items:{}});
    });
    it('handel action of type LOAD_ITEMS',()=>{
        const action = {type: LOAD_ITEMS,payload: {item: ''}};
        expect(productlistReducer({items:{}},action)).to.eql({items:{item:''}});
    });
});