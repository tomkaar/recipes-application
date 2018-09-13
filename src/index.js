import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import "./styles/styles.scss";

import { Provider } from "react-redux";
import firebase from "firebase";

import store from "./store/store";
import { startSetRecipe } from './actions/recipes';
import { userLogin, userLogout } from "./actions/user";

store.subscribe(() => { console.log(store.getState()); });

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

// Loading screen until app is ready
ReactDOM.render(<p>Loading..</p>, document.getElementById('root'));

// Get all recipes from firebase
store.dispatch(startSetRecipe())
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

