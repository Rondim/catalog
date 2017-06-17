/**
 * Created by xax on 23.02.2017.
 */
import {AUTH_USER, UNAUTH_USER} from '../actions/types';

/**
 * Редюсер авторизации
 * @param {object} state
 * @param {object} action
 * @return {*}
 */
export default function(state = {authenticated: false, error: ''}, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload.code ?
        {...state, error: action.payload.message, authenticated: false} :
        ({...state, error: '', authenticated: action.payload.uid});
    case UNAUTH_USER:
      return {...state, authenticated: false};
  }
  return state;
}
