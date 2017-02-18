/**
 * Created by xax on 18.02.2017.
 */
import { expect } from '../test_helper';
import {loadItems} from '../../src/actions';
import {LOAD_ITEMS} from '../../src/actions/types';

describe('actions',()=>{
    describe('loadItems', ()=>{
        it('тип - корректен',()=>{
            const action = loadItems();
            expect(action.type).to.equal(LOAD_ITEMS);
        });
        it('has payload',()=>{
            const payload = loadItems().payload;
            expect(payload).to.exist;
        });
    });
});