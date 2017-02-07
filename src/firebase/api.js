/**
 * Created by xax on 05.02.2017.
 */
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyB0nn0cVuc7GPb67UYzKeBI1_BAcTImj-g",
    authDomain: " catalog-26b41.firebaseapp.com",
    databaseURL: "https://catalog-26b41.firebaseio.com",
    storageBucket: "catalog-26b41.appspot.com",
};
firebase.initializeApp(config);
export const Auth = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Firebase auth error: ', errorCode, errorMessage);
        // ...
    });
};
export const Storage = () => {
    return firebase.storage().ref().child('items');
};

export function getTestData() {
  let filterRef = firebase.database().ref('/filter');
  filterRef.on('value', (snapshot) => {
    console.log(snapshot.val());
  });
};


export const firebaseDB = firebase.database();
