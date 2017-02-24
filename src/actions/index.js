import { firebaseDB, Storage, firebaseAuth } from '../firebase/api';
import {AUTH_USER,
    UNAUTH_USER,
    LOAD_ITEMS,
    NEW_ITEM,SET_INITIAL_STATE,
    SUBFILTER_SELECT,
    FILTER_ENTER,
    FILTER_LEAVE} from './types';
import {hashHistory} from 'react-router';


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
    let url='';
    if(file){
        const fileRef = Storage().child(file.name);
        const uploadTask=fileRef.put(file);
        url = uploadTask.then(
            snapshot=> snapshot.downloadURL,
            err => console.log('File fetch error')
        );
    }
    return{
        type: NEW_ITEM,
        payload: url
    }
}

export function signinUser(values) {
    const email = values.email;
    const password = values.password;
    const request = firebaseAuth.signInWithEmailAndPassword(email, password);
    return{
        type: AUTH_USER,
        payload: request
    }
}

export function signoutUser() {
    const request = firebaseAuth.signOut();
    return{
        type: UNAUTH_USER,
        payload: request
    }
}

export function checkAuthentificated() {
    return function (dispatch) {
        firebaseAuth.onAuthStateChanged((user) => {
            if(user){
                dispatch({type:AUTH_USER,payload:user});
            }
            else {
                hashHistory.push('/signin');
            }
        });
    }
}