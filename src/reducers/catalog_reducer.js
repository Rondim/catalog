import { SET_CATALOG_SIDEBAR_STATE } from '../actions/types';

const initialCatalogState = {
  sidebar: {}
};


const catalogReducer = (state=initialCatalogState, action) => {
  switch (action.type) {
    case SET_CATALOG_SIDEBAR_STATE:
      return action.state;
    default:
      return state;
  }
};

export default catalogReducer;
