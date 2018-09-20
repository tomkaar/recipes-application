const userReducerDefaultState = {
    user: "",
    uid: "",
    likes: []
};

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, user: action.user, uid: action.user.uid };
        case "USER_LOGOUT":
            return { ...state, user: "", uid: "" };
        case "SET_LIKES":
            return { ...state, likes: action.likes }
        case "ADD_LIKE":
            return { ...state, likes: [ ...state.likes, action.id ] }
        case "REMOVE_LIKE":
            return { 
                ...state, 
                likes: state.likes.filter((id) => id !== action.id )
            }
        default:
            return state;
    }
}