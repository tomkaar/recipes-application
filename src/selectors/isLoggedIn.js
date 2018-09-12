import store from "../store/store";

function isLoggedIn () {
    return store.getState().user.user ? true : false;
}

export default isLoggedIn;