import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import "./styles/styles.scss";

import App from './App';
import Loading from './components/Loading';

import { Provider } from "react-redux";
import firebase from "firebase";

import store from "./store/store";
import { firebaseSetRecipe } from './actions/recipes';
import { userLogin, userLogout } from "./actions/user";

store.subscribe(() => { console.log(store.getState()); });

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

// Loading screen until app is ready
ReactDOM.render(
    <Loading message="The application is currently loading"/>, 
    document.getElementById('root')
);

// Get all recipes from firebase
store.dispatch(firebaseSetRecipe())
    // Check if user is logged in
    .then(() => {
        firebase.auth()
            .onAuthStateChanged((user) => {
                user ? store.dispatch(userLogin(user)) : store.dispatch(userLogout());
            });
    })
    .then(() => {
        // When App is Ready, render
        ReactDOM.render(app, document.getElementById('root'));
    });

registerServiceWorker();
