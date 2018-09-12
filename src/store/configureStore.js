import { createStore, combineReducers } from "redux";
import filterReducer from "../reducers/filters";
import userReducer from "../reducers/users";

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            filters: filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
