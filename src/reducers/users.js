const userReducerDefaultState = {
    user: "",
    uid: ""
};

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, user: action.user, uid: action.user.uid };
        case "USER_LOGOUT":
            return { ...state, user: "", uid: "" };
        default:
            return state;
    }
}