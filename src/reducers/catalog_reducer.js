import { SET_CATALOG_SIDEBAR_STATE, FETCH_SIDEBAR_CONFIG } from '../actions/types';

const initialCatalogState = {
  sidebar: {
    order: [],
    menus: {
      itemType: {
        filtersSelected: {}
      },
      itemSubtype: {
        filtersSelected: {}
      }
    }
  },
};


const catalogReducer = (state=initialCatalogState, action) => {
  switch (action.type) {
    case SET_CATALOG_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload };
    case FETCH_SIDEBAR_CONFIG:
      let sidebar = action.payload;
      sidebar.menus.itemType.filtersSelected = {};
      sidebar.menus.itemSubtype.filtersSelected = {};
      sidebar.menus.sizes.filtersSelected = {};
      return { ...state, sidebar: sidebar };
    default:
      return state;
  }
};

export default catalogReducer;
