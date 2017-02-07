import { firebaseDB } from '../firebase/api';

export const SET_FILTERS = 'SET_FILTERS';
export const SUBFILTER_SELECT = 'SUBFILTER_SELECT';
export const FILTER_ENTER = 'FILTER_ENTER';
export const FILTER_LEAVE = 'FILTER_LEAVE';

export function setFilters() {
  const filters = firebaseDB.ref('/filter').once('value')
    .then(snapshot => snapshot.val(), err => console.log('Filters fetch error'));
  return {
    type: SET_FILTERS,
    payload: filters
  };
};

export function subFilterSelect(filter, subFilter) {
  return {
    type: SUBFILTER_SELECT,
    filter,
    subFilter
  };
};

export function filterEnter(filterName) {
  return {
    type: FILTER_ENTER,
    filterName
  };
};

export function filterLeave() {
  return {
    type: FILTER_LEAVE
  };
};
