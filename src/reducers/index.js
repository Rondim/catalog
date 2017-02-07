import { combineReducers } from 'redux';
import sidebarReducer from './sidebar_reducer';

// export default (state={}, action) => {
//   return state;
// }
export default combineReducers({
  sidebar: sidebarReducer
});
