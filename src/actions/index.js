import { firebaseDB, Storage, firebaseAuth } from '../firebase/api';
import {
    AUTH_USER,
    UNAUTH_USER,
    LOAD_ITEMS,
    NEW_ITEM,SET_INITIAL_STATE,
    SUBFILTER_SELECT,
    FILTER_ENTER,
    FILTER_LEAVE,
    FILTER_RESET,
    FETCH_ITEM_LIST,
    MARK_ACTIVE,
    UPDATE_ITEM
} from './types';
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
    return function (dispatch, getState) {
        dispatch({
            type: SUBFILTER_SELECT,
            filter,
            subfilter,
            prevSelected
        });
        const items = getState().ProductList.activeItems;
        const list = getState().ProductList.activeList;
        let updates = {};
        items.map(item =>{
            updates[`/lists/${list}/${item}/filters/${filter}`] = subfilter;
            let itemFilters = {item,filters:{}};
            itemFilters.filters[filter]=subfilter;
            console.log(getState().sidebar.filters);
            dispatch({
                type: UPDATE_ITEM,
                payload:itemFilters
            });
        });
        firebaseDB.ref().update(updates);
    }
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
export function newItem(file) {
    return function (dispatch,getState) {
        if(file){
            const list = getState().ProductList.activeList;
            const key = firebaseDB.ref().child(list).push().key;
            const fileRef = Storage().child(key);
            const uploadTask=fileRef.put(file);
            uploadTask.then(
                snapshot=> {
                    let updates = {};
                    const url = snapshot.downloadURL;
                    updates[`/lists/${list}/${key}/url`] = url;
                    firebaseDB.ref().update(updates);
                    dispatch({
                        type: NEW_ITEM,
                        payload: {key,url}
                    })
                },
                err => console.log('File fetch error')
            );
        }
    };
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

export function fetchItemList() {
    return function (dispatch,getState) {
        const uid = getState().auth.authenticated;
        const {activeList} = getState().ProductList;
        if(uid&&!activeList){
            firebaseDB.ref(`/users/${uid}/lists`).once('value')
                .then(snapshot => {
                    if(snapshot.val()){
                        const key = Object.keys(snapshot.val())[0];
                        dispatch({
                            type: FETCH_ITEM_LIST,
                            payload: key
                        });
                        firebaseDB.ref(`/lists/${key}`).once('value')
                            .then((snapshot) => {
                                dispatch({
                                    type: LOAD_ITEMS,
                                    payload: {manager: snapshot.val()}
                                });
                            }, err => console.log(err));
                        firebaseDB.ref(`/main`).once('value')
                            .then((snapshot) => {
                                dispatch({
                                    type: LOAD_ITEMS,
                                    payload: {catalog: snapshot.val()}
                                });
                            }, err => console.log(err));
                    }
                    else {
                        const key = firebaseDB.ref().child(`/lists`).push().key;
                        let updates = {};
                        updates[`/users/${uid}/lists/${key}`] = true;
                        firebaseDB.ref().update(updates);
                        dispatch({
                            type: FETCH_ITEM_LIST,
                            payload: key
                        });
                        firebaseDB.ref(`/main`).once('value')
                            .then((snapshot) => {
                                dispatch({
                                    type: LOAD_ITEMS,
                                    payload: {catalog: snapshot.val()}
                                });
                            }, err => console.log(err));
                    }
                }, err => console.log(err));
        }
    };
}
export function mark(key,type) {
    return function (dispatch, getState) {
        dispatch({
            type: MARK_ACTIVE,
            payload:{key,type}
        });
        if(getState().ProductList.activeItems.length==1){
            const item = getState().ProductList.items.manager[key];
            if(!item.filters) item.filters={};
            firebaseDB.ref('/filter').once('value')
                .then(snapshot => {
                    dispatch ({
                        type: SET_INITIAL_STATE,
                        payload: snapshot.val()
                    });
                    Object.keys(item.filters).forEach((filter)=>{
                        const subfilter = item.filters[filter];
                        const prevSelected = getState().sidebar.filters[filter].subfilters[subfilter].isSelected;
                        dispatch({
                            type: SUBFILTER_SELECT,
                            filter,
                            subfilter,
                            prevSelected
                        });
                    });
                }, err => console.log('Filters fetch error'));
        }
        if(getState().ProductList.activeItems.length==0){
            firebaseDB.ref('/filter').once('value')
                .then(snapshot => {
                    dispatch ({
                        type: SET_INITIAL_STATE,
                        payload: snapshot.val()
                    });
                }, err => console.log('Filters fetch error'));
        }
    };
}