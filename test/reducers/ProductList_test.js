/**
 * Created by xax on 12.02.2017.
 */
import { expect } from '../test_helper';
import productlistReducer from '../../src/reducers/ProductList_reducer';
import { LOAD_ITEMS,NEW_ITEM } from '../../src/actions/types';

describe('ProductList reducer',()=>{
    it('handles action with unknown type',()=>{
        expect(productlistReducer(undefined,{})).to.eql({items:{}});
    });
    it('handel action of type LOAD_ITEMS',()=>{
        const action = {type: LOAD_ITEMS,payload: {item: ''}};
        expect(productlistReducer({items:{}},action)).to.eql({items:{item:''}});
    });
    it('handel action of type NEW_ITEM',()=>{
        const action = {type: NEW_ITEM,payload: 'https://someurl'};
        const reducer = productlistReducer({items:{}},action);
        const hash = Object.keys(reducer.items)[0];
        let output = {items:{}};
        output.items[hash] = {url:'https://someurl'};
        expect(reducer).to.eql(output);
    });
});