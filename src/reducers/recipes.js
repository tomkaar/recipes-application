const recipesDefaultState = [];

export default (state = recipesDefaultState, action) => {
    switch (action.type) {
        case "ADD_RECIPE":
            return [...state, action.expense];
        case "REMOVE_RECIPE":
            return state.filter(({ id }) => id !== action.id);
        case "EDIT_RECIPE":
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return { ...state, ...action.update };
                } else {
                    return expense;
                }
            });
        case "SET_RECIPE":
            return action.expenses;
        default:
            return state;
    }
}