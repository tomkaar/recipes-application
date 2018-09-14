const filterReducerDefaultState = {
    text: "",
    sortBy: "latest",
    isVegetarian: "all"
};

export default (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return { ...state, text: action.text };
        case "SET_IS_VEGETARIAN":
            return { ...state, isVegetarian: action.isVegetarian };
        case "SORT_BY_LATEST":
            return { ...state, sortBy: "latest" };
        case "SORT_BY_OLDEST":
            return { ...state, sortBy: "oldest" };
        default:
            return state;
    }
}