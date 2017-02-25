/**
 * Created by xax on 18.02.2017.
 */
import { LOAD_ITEMS, NEW_ITEM, FETCH_ITEM_LIST } from '../actions/types';
const initialState = {
    items:{
        manager:{},
        catalog:{}
    },
    activeList:false
};

const productlistReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_ITEMS:
            const items = {};
            items.manager = action.payload.manager ?
                action.payload.manager :
                state.items.manager;
            items.catalog = action.payload.catalog ?
                action.payload.catalog :
                state.items.catalog;
            return {...state, items};
        case NEW_ITEM:
            let itemsNew = state.items;
            const url = action.payload.url;
            itemsNew.manager[action.payload.key] = {url};
            return {...state, items:itemsNew};
        case FETCH_ITEM_LIST:
            return {...state, activeList: action.payload};
    }
    return state;
};

export default productlistReducer;
