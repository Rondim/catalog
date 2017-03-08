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
import {obj_cross} from './functions/objects_crossing';


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
/**
 * Загружает новую картинку в Storage, возвращает URL, который потом записывает в новосозданный item
 * @param {file} file -  файл полученный через <input type="file">, картинка нового item'a
 * @returns {Function}
 */
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
/**
 * Иницирует начало сессии пользоателя, отправляя запрос в firebase на вход по почте/паролю,
 * пользователи создаются в firebase
 * @param {object} values содержит в себе два знаечения:
 * 1 email - для почты
 * 2 password - для пароля
 * @returns {{type, payload: (firebase.Promise<any>|*|{name, a}|!firebase.Promise.<!firebase.User>)}}
 */
export function signinUser(values) {
    const email = values.email;
    const password = values.password;
    const request = firebaseAuth.signInWithEmailAndPassword(email, password);
    return{
        type: AUTH_USER,
        payload: request
    }
}
/**
 * Иницирует окончание сессии пользователя, посылая в firebase запрос на выход.
 * @returns {{type, payload: (firebase.Promise<any>|*|{name, a}|!firebase.Promise.<void>)}}
 */
export function signoutUser() {
    const request = firebaseAuth.signOut();
    return{
        type: UNAUTH_USER,
        payload: request
    }
}
/**
 * Обращается к api firebase, сверяет хэш пользователя для доступа к сайту, работает через reduxThunk
 * @returns {Function}
 */
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
/**
 * Запрашивает из базы данных список item'ов, на текущий момент не имеет переменных, запрашивает астивный лист и каталог,
 * работает через reduxThunk
 * @returns {Function}
 */
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
/**
 * Меняет состояние item, работает через reduxThunk
 *
 * @param {string} key - ключ item
 * @param {string} type - новое состояние item'a
 * @returns {Function}
 */
export function mark(key,type) {
    return function (dispatch, getState) {
        dispatch({
            type: MARK_ACTIVE,
            payload:{key,type}
        });
        firebaseDB.ref('/filter').once('value')
            .then(snapshot => {
                dispatch ({
                    type: SET_INITIAL_STATE,
                    payload: snapshot.val()
                });
                const activeItems = getState().ProductList.activeItems;
                let items = [];
                activeItems.forEach((item)=>{
                    items.push(getState().ProductList.items.manager[item])
                });
                const filters = obj_cross(items);
                const filter = 'itemType';
                const subfilteritemType = filters[filter];
                if(subfilteritemType){
                    const prevSelecteditemType = getState().sidebar.filters[filter].subfilters[subfilteritemType].isSelected;
                    dispatch({
                        type: SUBFILTER_SELECT,
                        filter,
                        subfilter:subfilteritemType,
                        prevSelected:prevSelecteditemType
                    });
                }
                Object.keys(filters).forEach((filter)=>{
                    if(filter!='itemType'){
                        const subfilter = filters[filter];
                        const prevSelected = getState().sidebar.filters[filter].subfilters[subfilter].isSelected;
                        dispatch({
                            type: SUBFILTER_SELECT,
                            filter,
                            subfilter,
                            prevSelected
                        });
                    }
                });
            }, err => console.log('Filters fetch error'));
    };
}