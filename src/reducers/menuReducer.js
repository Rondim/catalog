import { CATALOG, MANAGER } from '../consts';
import { MENU_CLICKED } from '../actions';

export default function(state=CATALOG, action) {
  switch(action.type) {
    case MENU_CLICKED:
      console.log(action.menuName);
      return action.menuName;
    default:
      return state;
  }
};
