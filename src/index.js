import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";
import store from "./store/store";
import { startSetRecipe } from './actions/recipes';

store.subscribe(() => { console.log(store.getState()); });

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<p>Loading..</p>, document.getElementById('root'));

store.dispatch(startSetRecipe())
    .then(() => {
        ReactDOM.render(app, document.getElementById('root'));
    });

registerServiceWorker();

