import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/users";
import filterReducer from "../reducers/filters";
import messageReducer from "../reducers/messages";

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            filters: filterReducer,
            messages: messageReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
