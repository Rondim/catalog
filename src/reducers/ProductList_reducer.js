/**
 * Created by xax on 18.02.2017.
 */
import { LOAD_ITEMS, NEW_ITEM, FETCH_ITEM_LIST } from '../actions/types';

const productlistReducer = (state={items: {},activeList:false}, action) => {
    switch (action.type) {
        case LOAD_ITEMS:
            const items = action.payload;
            return {...state, items};
        case NEW_ITEM:
            let itemsNew = state.items;
            const url = action.payload.url;
            itemsNew[action.payload.key] = {url};
            return {...state, items:itemsNew};
        case FETCH_ITEM_LIST:
            return {...state, activeList: action.payload};
    }
    return state;
};

export default productlistReducer;
