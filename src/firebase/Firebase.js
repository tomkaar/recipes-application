import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCI3PFwsjm0sGQlSKd67wDT87Vk-zLa9QY",
    authDomain: "test-c34ab.firebaseapp.com",
    databaseURL: "https://test-c34ab.firebaseio.com",
    projectId: "test-c34ab",
    storageBucket: "test-c34ab.appspot.com",
    messagingSenderId: "807080238665"
};

firebase.initializeApp(config);

const database = firebase.database();
var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleAuthProvider };
