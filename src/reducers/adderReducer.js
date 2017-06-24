/**
 * Created by xax on 18.06.2017.
 */
import { SUCCESS, ERROR, FETCH_UP_FILTERS, FETCH_DEPENDENCES } from '../actions/types';
const initialState = { success: false, error: '', upFilters: [], dependences: [] };
export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return action.payload ?
        { ...state, error: '', success: true } :
        { ...state, error: 'Неизвестная ошибка', success: false };
    case ERROR:
      return { ...state, error: action.payload.message, success: false };
    case FETCH_UP_FILTERS:
      return { ...state, upFilters: action.payload };
    case FETCH_DEPENDENCES:
      return { ...state, dependences: action.payload };
  }
  return state;
}
