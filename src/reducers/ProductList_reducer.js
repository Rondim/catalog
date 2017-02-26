/**
 * Created by xax on 18.02.2017.
 */
import { LOAD_ITEMS, NEW_ITEM, FETCH_ITEM_LIST,MARK_ACTIVE,UPDATE_ITEM } from '../actions/types';
const initialState = {
    items:{
        manager:{},
        catalog:{}
    },
    activeList:false,
    activeItems:[]
};

const productlistReducer = (state=initialState, action) => {
    let items = state.items;
    switch (action.type) {
        case LOAD_ITEMS:
            items.manager = action.payload.manager ?
                action.payload.manager :
                state.items.manager;
            items.catalog = action.payload.catalog ?
                action.payload.catalog :
                state.items.catalog;
            return {...state, items};
        case NEW_ITEM:
            const url = action.payload.url;
            items.manager[action.payload.key] = {url};
            items.manager[action.payload.key].filters ={};
            return {...state, items:items};
        case FETCH_ITEM_LIST:
            return {...state, activeList: action.payload};
        case MARK_ACTIVE:
            const key = action.payload.key;
            let activeItems = state.activeItems;
            if(action.payload.type == 'active'){
                const index = activeItems.indexOf(key);
                items.manager[key].active ?
                    (index!=-1?
                        activeItems.splice(index,1):
                        false
                    ) :
                    activeItems.push(key);
                items.manager[key].active = !items.manager[key].active;
                return { ...state, items, activeItems:activeItems };
            }
            return state;
        case UPDATE_ITEM:
            items.manager[action.payload.item].filters = Object.assign(items.manager[action.payload.item].filters,action.payload.filters);
            console.log(items.manager[action.payload.item]);
            return {...state,items};
    }
    return state;
};

export default productlistReducer;
