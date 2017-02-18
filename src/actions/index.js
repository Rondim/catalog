import { firebaseDB, Storage } from '../firebase/api';
import {makeHash} from './hash_gen';

import {SET_INITIAL_STATE, SUBFILTER_SELECT, LOAD_ITEMS, NEW_ITEM, FILTER_ENTER, FILTER_LEAVE} from './types'


export function setInitialState() {
  const filters = firebaseDB.ref('/filter').once('value')
    .then(snapshot => snapshot.val(), err => console.log('Filters fetch error'));
  return {
    type: SET_INITIAL_STATE,
    payload: filters
  };
}

export function subFilterSelect(filter, subfilter, prevSelected) {
  return {
    type: SUBFILTER_SELECT,
    filter,
    subfilter,
    prevSelected
  };
}

export function filterEnter(filterName) {
  return {
    type: FILTER_ENTER,
    filterName
  };
}

export function filterLeave() {
  return {
    type: FILTER_LEAVE
  };
}
export function loadItems() {
  const items = firebaseDB.ref('/main').once('value')
      .then(snapshot => snapshot.val(), err => console.log('Items fetch error'));
    return{
      type: LOAD_ITEMS,
      payload: items
    }
}
export function newItem(file) {
    const itemsRef= Storage();
    const uploadTask=itemsRef.child(file.name).put(file);
    const url = uploadTask.then(
        snapshot=> snapshot.downloadURL,
        err => console.log('File fetch error')
    );
    return{
        type: NEW_ITEM,
        payload: url
    }
}