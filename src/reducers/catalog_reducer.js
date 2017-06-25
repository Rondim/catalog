import {
  SET_CATALOG_SIDEBAR_STATE,
  FETCH_SIDEBAR_CONFIG,
  AFTER_RESET_PAGE
} from '../actions/types';

const initialCatalogState = {
  sidebar: {
    order: [],
    menus: {},
    filtersSelected: {},
    dependencies: {}
  },
  resetPage: false
};
// order: [],
// menus: {
//   itemType: {
//     filtersSelected: {}
//   },
//   itemSubtype: {
//     filtersSelected: {}
//   }
// }

const catalogReducer = (state=initialCatalogState, action) => {
  switch (action.type) {
    case SET_CATALOG_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload, resetPage: true };
    case FETCH_SIDEBAR_CONFIG:
      let sidebar = initConfigToState(action.payload);
      return { ...state, sidebar };
    case AFTER_RESET_PAGE:
      return { ...state, resetPage: false };
    default:
      return state;
  }
};

export default catalogReducer;

function initConfigToState(config) {
  // Вставить filtersSelected
  let filtersSelected = {};
  config.order.forEach(menuId => {
    filtersSelected[menuId] = {};
    config['menus'][menuId]['menuId'] = menuId;
  });
  config.filtersSelected = filtersSelected;
  return config;
}
