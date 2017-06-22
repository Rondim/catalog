import { SET_CATALOG_SIDEBAR_STATE, FETCH_SIDEBAR_CONFIG } from '../actions/types';

const initialCatalogState = {
  sidebar: {
    order: [],
    menus: {},
    filtersSelected: {},
    dependencies: {}
  }
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
      return { ...state, sidebar: action.payload };
    case FETCH_SIDEBAR_CONFIG:
      let sidebar = initConfigToState(action.payload);
      return { ...state, sidebar };
    default:
      return state;
  }
};

export default catalogReducer;

function initConfigToState(config) {
  // Вставить filtersSelected
  let filtersSelected = {};
  config.order.forEach(menuId => {
    filtersSelected = { ...filtersSelected, [menuId]: {} };
    config['menus'][menuId]['menuId'] = menuId;
  });
  config.filtersSelected = filtersSelected;

  return config;
}
