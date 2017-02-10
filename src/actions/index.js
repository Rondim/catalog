import { firebaseDB } from '../firebase/api';

export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const SUBFILTER_SELECT = 'SUBFILTER_SELECT';
export const FILTER_ENTER = 'FILTER_ENTER';
export const FILTER_LEAVE = 'FILTER_LEAVE';

export function setInitialState() {
  const filters = firebaseDB.ref('/filter').once('value')
    .then(snapshot => snapshot.val(), err => console.log('Filters fetch error'));
  return {
    type: SET_INITIAL_STATE,
    payload: filters
  };
};

export function subFilterSelect(filter, subfilter, prevSelected) {
  return {
    type: SUBFILTER_SELECT,
    filter,
    subfilter,
    prevSelected
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
