import { database } from "../firebase/Firebase";
import { newMessage } from "./messages";


export const addRecipe = (expense) => ({
    type: "ADD_RECIPE",
    expense
});

export const firebaseAddRecipe = (expense = {}) => {
    return (dispatch) => {
        return database.ref("recipes").push(expense)
            .then((ref) => {
                dispatch(addRecipe({
                    id: ref.key,
                    ...expense
                }))
                dispatch(newMessage("You have added a new Recipe to the collection.", "Success", 3000));
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
            });
    }
}





export const removeRecipe = (id) => ({
    type: "REMOVE_RECIPE",
    id
});

export const firebaseRemoveRecipe = (id) => {
    return (dispatch) => {
        return database.ref(`recipes/${id}`).remove()
            .then((ref) => {
                dispatch(removeRecipe(id))
                dispatch(newMessage("This recipe has been removed.", "Success", 3000));
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
            });
    }
}





export const editRecipe = (id, update) => ({
    type: "EDIT_RECIPE",
    id,
    update
});

export const startEditRecipe = (id, update) => {
    return (dispatch) => {
        return database.ref(`recipes/${id}`).set(update)
            .then(() => {
                dispatch(editRecipe(id, update))
                dispatch(newMessage("Your changes has been saved", "Success", 3000))
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
            });
    }
}





export const setRecipe = (expenses) => ({
    type: "SET_RECIPE",
    expenses
});

export const startSetRecipe = (expenses) => {
    return (dispatch) => {
        return database.ref("recipes").once("value")
            .then((snapshot) => {
                const expenses = [];

                snapshot.forEach((childSnapShot) => {
                    expenses.push({
                        id: childSnapShot.key,
                        ...childSnapShot.val()
                    })
                });

                dispatch(setRecipe(expenses));
            });
    }
};