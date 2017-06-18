/**
 * Created by xax on 18.06.2017.
 */
import { SUCCESS, ERROR } from '../actions/types';

export default function(state = { success: false, error: '' }, action) {
  switch (action.type) {
    case SUCCESS:
      return action.payload ?
        { ...state, error: '', success: true } :
        { ...state, error: 'Неизвестная ошибка', success: false };
    case ERROR:
      return { ...state, error: action.payload.message, success: false };
  }
  return state;
}
