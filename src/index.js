import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

import "./styles/styles.scss";

import store from "./store/store";
import { firebase } from "./firebase/Firebase";
import { userLogin, userLogout } from "./actions/auth";
import { GetUserLikesFromFirebase } from "./actions/recipes";

import App from './App';
import Loading from './components/layout/Loading';

store.subscribe(() => { console.log(store.getState()); });

// use Provide to access store from every component inside app
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
    // if user is logged in -> get all likes
firebase.auth()
    .onAuthStateChanged((user) => {
        user ? store.dispatch(userLogin(user)) : store.dispatch(userLogout());
        user && GetUserLikesFromFirebase(user.uid);
        ReactDOM.render(app, document.getElementById('root'));
    });

registerServiceWorker();
