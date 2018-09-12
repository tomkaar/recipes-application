import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";
import store from "./store/store";

store.subscribe(() => { console.log(store.getState()); });

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();

// connect to the Redux Store 
// add Provider from react-redux to add Redux Store to the component, 
// we can now use connect and connect to the store on the components that needs it

