import { SET_FILTERS, SUBFILTER_SELECT, FILTER_ENTER, FILTER_LEAVE } from '../actions/';


const sidebarReducer = (state={ filters: {}, activeFilter: '' }, action) => {
  switch (action.type) {
    case SET_FILTERS:
      let filters = insertIsSelected(action.payload);
      return { filters };
    case SUBFILTER_SELECT:
      // Создаем копию состояния и меняем внутри одного подфильтра значение isSelected
      let newFilterState = {...state};
      let subFilterObj = newFilterState['filters'][action.filter][action.subFilter];
      subFilterObj['isSelected'] = !subFilterObj['isSelected'];
      return newFilterState;
    case FILTER_ENTER:
      return {...state, activeFilter: action.filterName };
    case FILTER_LEAVE:
      return {...state, activeFilter: "" };
    default:
      return state;
  }
}

export default sidebarReducer;

function insertIsSelected(filtersFromBD) {
  let newFilterObj = {};
  Object.keys(filtersFromBD).forEach(filter => {
    newFilterObj[filter] = {};
    Object.keys(filtersFromBD[filter]).forEach(subFilter => {
      newFilterObj[filter][subFilter] = {};
      newFilterObj[filter][subFilter]['isSelected'] = false;
      newFilterObj[filter][subFilter]['name'] = filtersFromBD[filter][subFilter]['name'];
    });
  });
  return newFilterObj;
}
