import { database } from "../firebase/Firebase";
import { newMessage } from "./messages";
import store from "../store/store";


// funktionen för att endast uppdatera redux state
export const clearRecipe = () => ({
    type: "CLEAR_RECIPES"
});


// funktionen för att endast uppdatera redux state
export const addRecipe = (expense) => ({
    type: "ADD_RECIPE",
    expense
});

// funktion för att prata med firebase och senare updatera redux state.
export const firebaseAddRecipe = (data = {}) => {
    return (dispatch) => {
        const uid = store.getState().user.uid;
        const expense = { 
            title: data.title,
            description: data.description,
            isVegetarian: data.isVegetarian,
            ingredients: data.ingredients ? data.ingredients.length : 0,
            createdBy: uid, 
            timestamp: new Date().getTime()
        };
        return database.ref("recipes").push(expense)
            .then((snapshot) => {
                database.ref(`recipeOwner/${uid}`).update({ [snapshot.key]: true });
                database.ref(`ingredients/${snapshot.key}`).set(data.ingredients);
                dispatch(addRecipe({
                    id: snapshot.key,
                    ...expense
                }));
                dispatch(newMessage("You have added a new Recipe to the collection.", "Success", 3000));
                return true;
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
                return false;
            });
    }
}




// funktionen för att endast uppdatera redux state
export const removeRecipe = (id) => ({
    type: "REMOVE_RECIPE",
    id
});

// funktion för att prata med firebase och senare updatera redux state.
export const firebaseRemoveRecipe = (id) => {
    return (dispatch) => {
        const uid = store.getState().user.uid;
        return database.ref(`recipes/${id}`).remove()
            .then(() => {
                database.ref(`ingredients/${id}`).remove();
                database.ref(`recipeOwner/${uid}/${id}`).remove();
                dispatch(removeRecipe(id))
                dispatch(newMessage("This recipe has been removed.", "Success", 3000));
            })
            .catch((error) => {
                dispatch(newMessage(error.message, "Error", 3000));
            });
    }
}




// funktionen för att endast uppdatera redux state
export const editRecipe = (id, update) => ({
    type: "EDIT_RECIPE",
    id,
    update
});

// funktion för att prata med firebase och senare updatera redux state.
export const firebaseEditRecipe = (id, data) => {
    return (dispatch) => {
        const uid = store.getState().user.uid;
        const update = {
            title: data.title,
            description: data.description,
            isVegetarian: data.isVegetarian,
            ingredients: data.ingredients ? data.ingredients.length : 0,
            timestamp: new Date().getTime(),
            createdBy: uid,
        }
        console.log(update);
        return database.ref(`recipes/${id}`).set(update)
            .then(() => {
                database.ref(`recipeOwner/${uid}`).update({ [id]: true });
                database.ref(`ingredients/${id}`).set(data.ingredients);
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




// // funktionen för att uppdatera redux state
// export const setRecipe = (expenses) => ({
//     type: "SET_RECIPE",
//     expenses
// });

// // funktion för att prata med firebase och senare updatera redux state.
// export const firebaseSetRecipe = (expenses) => {
//     return (dispatch) => {
//         return database.ref("recipes").once("value")
//             .then((snapshot) => {
//                 const expenses = [];

//                 snapshot.forEach((childSnapShot) => {
//                     expenses.push({
//                         id: childSnapShot.key,
//                         ...childSnapShot.val()
//                     })
//                 });

//                 dispatch(setRecipe(expenses));
//             });
//     }
// };
