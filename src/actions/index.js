import { firebaseDB, Storage, firebaseAuth } from '../firebase/api';
import {
    AUTH_USER,
    UNAUTH_USER,
    LOAD_ITEMS,
    NEW_ITEM,SET_INITIAL_STATE,
    SUBFILTER_SELECT,
    FILTER_ENTER,
    FILTER_LEAVE,
    FETCH_ITEM_LIST
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
export function newItem(file) {
    return function (dispatch,getState) {
        if(file){
            const list = getState().ProductList.activeList;
            const fileRef = Storage().child(file.name);
            const uploadTask=fileRef.put(file);
            uploadTask.then(
                snapshot=> {
                    const key = firebaseDB.ref().child(list).push().key;
                    let updates = {};
                    const url = snapshot.downloadURL;
                    updates[`/lists/${list}/${key}/url`] = url;
                    firebaseDB.ref().update(updates);
                    const meta = {
                        customMetadata: {'item':key}
                    };
                    fileRef.updateMetadata(meta).catch(err=>console.log(err));
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
                dispatch({type:AUTH_USER,payload:user.uid});
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
                                    payload: snapshot.val()
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
                        })
                    }
                }, err => console.log(err));
        }
    };
}