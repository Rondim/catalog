import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import menuReducer from './menuReducer';

export default combineReducers({
  menuSelected: menuReducer
});
