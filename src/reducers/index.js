import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import adderReducer from './adderReducer';

// export default (state={}, action) => {
//   return state;
// }

export default combineReducers({
  form,
  adder: adderReducer
});
