import { firebaseDB, firebaseStor, firebaseAuth } from '../firebase/api';
import {
  AUTH_USER,
  UNAUTH_USER,
  LOAD_ITEMS,
  NEW_ITEM,
  SET_INITIAL_STATE,
  SUBFILTER_SELECT,
  FILTER_ENTER,
  FILTER_LEAVE,
  FETCH_ITEM_LIST,
  MARK_ACTIVE,
  UPDATE_ITEM,
  FETCH_ITEM_CELLS,
  LOAD_CELLS,
  UPDATE_CELLS,
  REMOVE_CELL,
  SET_ACTIVE_CELL,
  RESET_ACTIVE_CELL,
  SET_CATALOG_SIDEBAR_STATE,
  FETCH_SIDEBAR_CONFIG,
  AFTER_RESET_PAGE
} from './types';
import { hashHistory } from 'react-router';
import { objCross } from './functions/objects_crossing';


export function setInitialState() {
  const filters = firebaseDB.ref('/filter').once('value')
    .then(snapshot => snapshot.val(), err => console.log('Filters fetch error'));
  return {
    type: SET_INITIAL_STATE,
    payload: filters
  };
}

export function subFilterSelect(filter, subfilter, prevSelected) {
  return function(dispatch, getState) {
    dispatch({
      type: SUBFILTER_SELECT,
      filter,
      subfilter,
      prevSelected
    });
    const items = getState().ProductList.activeItems;
    const list = getState().ProductList.activeList;
    let updates = {};
    items.map(item => {
      updates[`/lists/${list}/${item}/filters/${filter}`] = subfilter;
      let itemFilters = { item, filters: {} };
      itemFilters.filters[filter] = subfilter;
      dispatch({
        type: UPDATE_ITEM,
        payload: itemFilters
      });
    });
    firebaseDB.ref().update(updates);
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
/**
 * Загружает новую картинку в Storage, возвращает URL, который потом записывает в новосозданный item
 * @param {file} file -  файл полученный через <input type="file">, картинка нового item'a
 * @return {Function}
 */
export function newItem(file) {
  return function(dispatch, getState) {
    if (file) {
      const list = getState().ProductList.activeList;
      const key = firebaseDB.ref().child(list).push().key;
      const fileRef = firebaseStor().child(key);
      const uploadTask = fileRef.put(file);
      uploadTask.then(
        snapshot => {
          let updates = {};
          const url = snapshot.downloadURL;
          updates[`/lists/${list}/${key}/url`] = url;
          firebaseDB.ref().update(updates);
          dispatch({
            type: NEW_ITEM,
            payload: { key, url }
          });
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
 * @return {{type, payload: (firebase.Promise<any>|*|{name, a}|!firebase.Promise.<!firebase.User>)}}
 */
export function signinUser(values) {
  const email = values.email;
  const password = values.password;
  const request = firebaseAuth.signInWithEmailAndPassword(email, password);
  return {
    type: AUTH_USER,
    payload: request
  };
}
/**
 * Иницирует окончание сессии пользователя, посылая в firebase запрос на выход.
 * @return {{type, payload: (firebase.Promise<any>|*|{name, a}|!firebase.Promise.<void>)}}
 */
export function signoutUser() {
  const request = firebaseAuth.signOut();
  return {
    type: UNAUTH_USER,
    payload: request
  };
}
/**
 * Обращается к api firebase, сверяет хэш пользователя для доступа к сайту,
 * работает через reduxThunk
 * @param {string} user hash of user
 * @return {Function}
 */
export function checkAuthentificated(user) {
  if (user) {
    return { type: AUTH_USER, payload: user };
  } else {
    hashHistory.push('/signin');
  }
}
/**
 * Запрашивает из базы данных список item'ов, на текущий момент не имеет переменных,
 * запрашивает астивный лист и каталог,
 * работает через reduxThunk
 * @return {Function}
 */

export function fetchItemList(type, query) {
  return async function(dispatch, getState) {
    const uid = getState().auth.authenticated;
    const { activeList } = getState().ProductList;
    if (uid && !activeList) {
      if (type === 'manager') {
        try {
          const snapLists = await firebaseDB.ref(`/users/${uid}/lists`).once('value');
          if (snapLists.val()) {
            const key = Object.keys(snapLists.val())[0];
            dispatch({
              type: FETCH_ITEM_LIST,
              payload: key
            });
            const snapManItems = await firebaseDB.ref(`/lists/${key}`).once('value');
            dispatch({
              type: LOAD_ITEMS,
              payload: { manager: snapManItems.val() }
            });
          } else {
            const key = await firebaseDB.ref().child(`/lists`).push().key;
            let updates = {};
            updates[`/users/${uid}/lists/${key}`] = true;
            await firebaseDB.ref().update(updates);
            dispatch({
              type: FETCH_ITEM_LIST,
              payload: key
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else if (type === 'catalog') {
        try {
          let CatItems = {};
          if (query && Object.keys(query).length > 0) {
            let keys = Object.keys(query);
            const snapCatItems = await firebaseDB.ref(`/items`)
              .orderByChild(keys[0]).equalTo(query[keys[0]][0]).once('value');
            keys.shift();
            if (keys.length !== 0) {
              snapCatItems.forEach(child => {
                const item = child.val();
                let bad = false;
                keys.forEach(key =>{
                  bad = arrayOfCondidtions(query[key], item[key]);
                });
                if (!bad && child.hasChild('instances')) {
                  CatItems[child.key] = item;
                }
              });
            } else {
              snapCatItems.forEach(child => {
                if (child.hasChild('instances')) {
                  CatItems[child.key] = child.val();
                }
              });
            }
          } else {
            const snapCatItems = await firebaseDB.ref(`/items`).once('value');
            snapCatItems.forEach(child => {
              if (child.hasChild('instances')) {
                CatItems[child.key] = child.val();
              }
            });
          }
          dispatch({
            type: LOAD_ITEMS,
            payload: { catalog: CatItems }
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
}
function arrayOfCondidtions(array, value) {
  let sumCond;
  array.forEach(e => {
    if (e === value) {
      sumCond = false;
    }
  });
  sumCond = sumCond !==false? true : sumCond;
  return sumCond;
}
/**
 * Меняет состояние item, работает через reduxThunk
 *
 * @param {string} key - ключ item
 * @param {string} type - новое состояние item'a
 * @return {Function}
 */
export function mark(key, type) {
  return function(dispatch, getState) {
    dispatch({
      type: MARK_ACTIVE,
      payload: { key, type }
    });
    firebaseDB.ref('/filter').once('value')
      .then(snapshot => {
        dispatch({
          type: SET_INITIAL_STATE,
          payload: snapshot.val()
        });
        const activeItems = getState().ProductList.activeItems;
        let items = [];
        activeItems.forEach((item) => {
          items.push(getState().ProductList.items.manager[item]);
        });
        const filters = objCross(items);
        const filter = 'itemType';
        if (filters) {
          const subfilteritemType = filters[filter];
          if (subfilteritemType) {
            const prevSelecteditemType = getState().sidebar.filters[filter]
              .subfilters[subfilteritemType].isSelected;
            dispatch({
              type: SUBFILTER_SELECT,
              filter,
              subfilter: subfilteritemType,
              prevSelected: prevSelecteditemType
            });
          }

          Object.keys(filters).forEach((filter) => {
            if (filter !== 'itemType') {
              const subfilter = filters[filter];
              const prevSelected = getState().sidebar.filters[filter]
                .subfilters[subfilter].isSelected;
              dispatch({
                type: SUBFILTER_SELECT,
                filter,
                subfilter,
                prevSelected
              });
            }
          });
        }
      }, err => console.log('Filters fetch error'));
  };
}


// Start D&DCells

export function fetchCells() {
  return async function(dispatch, getState) {
    const uid = getState().auth.authenticated;
    const { activeCells } = getState().cells;
    if (uid && !activeCells) {
      try {
        const snapUserCells = await firebaseDB.ref(`/users/${uid}/cells`).once('value');
        let key;
        if (snapUserCells.val()) {
          key = Object.keys(snapUserCells.val())[0];
          const snapCell = await firebaseDB.ref(`/cells/${key}`).once('value');
          const cellsDb = snapCell.val();
          for (let cellId of Object.keys(cellsDb)) {
            const i = cellsDb[cellId].i;
            const j = cellsDb[cellId].j;
            const itemId = cellsDb[cellId].item;
            const snapItem = await firebaseDB.ref(`/main/${itemId}`).once('value');
            let cell = {
              id: cellId,
              item: snapItem.val()
            };
            cell.item.id = itemId;
            dispatch({
              type: LOAD_CELLS,
              payload: { cell, i, j }
            });
          }
        } else {
          key = await firebaseDB.ref().child(`/cells`).push().key;
          let updates = {};
          updates[`/users/${uid}/cells/${key}`] = true;
          await firebaseDB.ref().update(updates);
        }
        dispatch({
          type: FETCH_ITEM_CELLS,
          payload: key
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
}

export function copyCell(item, i, j) {
  return function(dispatch, getState) {
    const { activeCells } = getState().cells;
    let id = getState().cells.list[i][j] ? getState().cells.list[i][j].id : null;
    if (!id || id === null) {
      id = initCell(activeCells, i, j);
      dispatch({
        type: UPDATE_CELLS,
        payload: { id, i, j, item }
      });
    }
    pushItemToCell(activeCells, id, item.id);
  };
}
export function removeCell(id, i, j) {
  return function(dispatch, getState) {
    const { activeCells } = getState().cells;
    firebaseDB.ref(`/cells/${activeCells}/${id}`).remove()
      .then(() => {
        dispatch({
          type: REMOVE_CELL,
          payload: { i, j }
        });
      });
  };
}
// Инициалируем компоненту высавляем координаты
function initCell(activeCells, i, j) {
  const id = firebaseDB.ref().child(`/cells/${activeCells}`).push().key;
  let updates = {};
  updates[`/cells/${activeCells}/${id}/i`] = i;
  updates[`/cells/${activeCells}/${id}/j`] = j;
  firebaseDB.ref().update(updates);
  return id;
}
// Записываем item в Cell
function pushItemToCell(activeCells, key, item) {
  let updates = {};
  updates[`/cells/${activeCells}/${key}/item`] = item;
  firebaseDB.ref().update(updates);
}
/*
 //Записываем instance в Cell
 function pushInstanceToCell(activeCells,key, cell) {

 }
 */
export function setActiveCell(i, j) {
  return function(dispatch, getState) {
    if (getState().cells.list[i][j] !== undefined) {
      const active = !getState().cells.list[i][j].active;
      dispatch({
        type: SET_ACTIVE_CELL,
        payload: { i, j, active }
      });
    }
  };
}
export function resetActiveCells(i, j) {
  return function(dispatch, getState) {
    const active = getState().cells.active;

    if (active.length !== 1 || (active[0].i !== i || active[0].j !== j)) {
      dispatch({
        type: RESET_ACTIVE_CELL,
        payload: active
      });
    }
  };
}
// End D&DCells

// SidebarActions
export function setCatalogSidebarState(newState) {
  return {
    type: SET_CATALOG_SIDEBAR_STATE,
    payload: newState
  };
}

export function fetchSidebarConfig(type) {
  const config = firebaseDB.ref('/sidebarConfigs/' + type).once('value')
    .then(snapshot => snapshot.val(), err => console.log('Filters fetch error'));
  return {
    type: FETCH_SIDEBAR_CONFIG,
    payload: config
  };
}

export function afterResetPage() {
  return {
    type: AFTER_RESET_PAGE,
    payload: true
  };
}
// End SidebarActions
