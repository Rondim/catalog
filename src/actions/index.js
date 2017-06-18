import { firebaseDB, firebaseAuth } from '../firebase/api';
import {
  AUTH_USER,
  UNAUTH_USER,
  SUCCESS,
  ERROR
} from './types';
import { hashHistory } from 'react-router';

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


// Adder
export async function addItem(values) {
  let data ={ ...values };
  const lists = ['stones', 'tags', 'others'];
  for (let type of lists) {
    if (data[type]) {
      const list = data[type];
      data[type] = {};
      for (let elem of list) {
        if (elem !== undefined) {
          data[type][elem] = true;
        }
      }
    }
  }
  try {
    const key = await firebaseDB.ref().child(`/items`).push().key;
    let updates = {};
    updates[`/items/${key}`] = data;
    await firebaseDB.ref().update(updates);
    return {
      type: SUCCESS,
      payload: true
    };
  } catch (err) {
    return {
      type: ERROR,
      payload: err
    };
  }
}
// End Adder
