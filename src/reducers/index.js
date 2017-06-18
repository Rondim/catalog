import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import adderReducer from './adderReducer';

// export default (state={}, action) => {
//   return state;
// }

export default combineReducers({
  form,
  auth: authReducer,
  adder: adderReducer
});
