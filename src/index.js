import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import "./styles/styles.scss";

import App from './App';
import Loading from './components/layout/Loading';

import { Provider } from "react-redux";
import firebase from "firebase";

import store from "./store/store";
import { userLogin, userLogout } from "./actions/auth";

store.subscribe(() => { console.log(store.getState()); });

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

// Loading screen until App is ready
ReactDOM.render(
    <Loading message="The application is currently loading"/>, 
    document.getElementById('root')
);

// check AuthState, then remove Loader and render App
firebase.auth()
    .onAuthStateChanged((user) => {
        user ? store.dispatch(userLogin(user)) : store.dispatch(userLogout());
        ReactDOM.render(app, document.getElementById('root'));
    });

registerServiceWorker();
