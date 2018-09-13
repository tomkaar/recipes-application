import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "../reducers/users";
import filterReducer from "../reducers/filters";
import messageReducer from "../reducers/messages";
import recipesReducer from "../reducers/recipes";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            filters: filterReducer,
            messages: messageReducer,
            recipes: recipesReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
