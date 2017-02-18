/**
 * Created by xax on 18.02.2017.
 */
import { LOAD_ITEMS, NEW_ITEM } from '../actions/types';
import { makeHash } from '../actions/hash_gen';

const productlistReducer = (state={items: {}}, action) => {
    switch (action.type) {
        case LOAD_ITEMS:
            const items = action.payload;
            return {...state, items};
        case NEW_ITEM:
            let itemsNew = state.items;
            const url = action.payload;
            itemsNew[makeHash()] = {url};
            return {...state, items:itemsNew};
    }
    return state;
};

export default productlistReducer;
