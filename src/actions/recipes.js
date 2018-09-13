import { database } from "../firebase/Firebase";
import { newMessage } from "./messages";


export const addRecipe = (expense) => ({
    type: "ADD_RECIPE",
    expense
});

export const startAddRecipe = (expense = {}) => {
    return (dispatch) => {
        return database.ref("recipes").push(expense)
            .then((ref) => {
                dispatch(addRecipe({
                    id: ref.key,
                    ...expense
                }))
                dispatch(newMessage("You have added a new Recipe to the collection.", "Info", 3000));
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
            });
    }
}


export const removeRecipe = ({ id }) => ({
    type: "REMOVE_RECIPE",
    id
});

export const editRecipe = (id, updates) => ({
    type: "EDIT_RECIPE",
    id,
    updates
});

export const setRecipe = (expenses) => ({
    type: "SET_RECIPE",
    expenses
});

export const startSetRecipe = (expenses) => ({
    // Fetch expenses from firebase
    // Parse into array
    // Dispatch
})