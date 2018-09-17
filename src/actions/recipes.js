import { database } from "../firebase/Firebase";
import { newMessage } from "./messages";
import store from "../store/store";



export const clearRecipe = () => ({
    type: "CLEAR_RECIPES"
});



export const addRecipe = (expense) => ({
    type: "ADD_RECIPE",
    expense
});

export const firebaseAddRecipe = (data = {}) => {
    return (dispatch) => {
        const uid = store.getState().user.uid;
        const expense = { 
            ...data, 
            createdBy: uid, 
            timestamp: new Date().getTime()
        };
        return database.ref("recipes").push(expense)
            .then((snapshot) => {
                database.ref(`recipeOwner/${uid}`).update({
                    [snapshot.key]: true
                })
                dispatch(addRecipe({
                    id: snapshot.key,
                    ...expense
                }))
                dispatch(newMessage("You have added a new Recipe to the collection.", "Success", 3000));
                return true;
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
                return false;
            });
    }
}





export const removeRecipe = (id) => ({
    type: "REMOVE_RECIPE",
    id
});

export const firebaseRemoveRecipe = (id) => {
    return (dispatch) => {
        const uid = store.getState().user.uid;
        return database.ref(`recipes/${id}`).remove()
            .then((snapshot) => {
                database.ref(`recipeOwner/${uid}/${id}`).remove();
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

export const firebaseEditRecipe = (id, data) => {
    return (dispatch) => {
        const update = {
            ...data,
            createdBy: store.getState().user.uid,
            timestamp: new Date().getTime(),
        }
        return database.ref(`recipes/${id}`).set(update)
            .then(() => {
                dispatch(editRecipe(id, update))
                dispatch(newMessage("Your changes has been saved", "Success", 3000))
                return true;
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
                return false;
            });
    }
}





export const setRecipe = (expenses) => ({
    type: "SET_RECIPE",
    expenses
});

export const firebaseSetRecipe = (expenses) => {
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