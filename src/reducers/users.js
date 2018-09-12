const userReducerDefaultState = {
    user: ""
};

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, user: action.user };
        case "USER_LOGOUT":
            return { ...state, user: action.user };
        default:
            return state;
    }
}