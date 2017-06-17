import {
  SET_INITIAL_STATE,
  SUBFILTER_SELECT,
  FILTER_ENTER,
  FILTER_LEAVE
} from '../actions/types';
import {initializeProps, handleFilterSelect} from './sidebar_helper';
const initialSidebarState = {
  filters: {},
  activeFilter: ''
};


const sidebarReducer = (state = initialSidebarState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      const filters = initializeProps(action.payload);
      return {...state, filters};
    case SUBFILTER_SELECT:
      let newState = {...state};
      handleFilterSelect(newState['filters'], action.filter, action.subfilter, action.prevSelected);
      return newState;
    case FILTER_ENTER:
      return {...state, activeFilter: action.filterName};
    case FILTER_LEAVE:
      return {...state, activeFilter: ''};
    default:
      return state;
  }
};

export default sidebarReducer;
