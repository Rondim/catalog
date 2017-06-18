import { combineReducers } from 'redux';
import sidebarReducer from './sidebar_reducer';
import productlistReducer from './ProductList_reducer';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import cellsReducer from './Cells_reducer';

// export default (state={}, action) => {
//   return state;
// }

export default combineReducers({
  sidebar: sidebarReducer,
  ProductList: productlistReducer,
  form,
  auth: authReducer,
  cells: cellsReducer
});
