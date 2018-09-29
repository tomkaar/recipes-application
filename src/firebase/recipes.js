import { database } from "./Firebase";
import { newMessage } from "../actions//messages";
import store from "../store/store";



// Firebase modification
// These functions are used to update firebase
// when firebase is updated, the eventlisteners will be triggered and update the application

export const AddRecipeToFirebase = (data) => {
    const uid = store.getState().user.uid;
    const recipe = {
        title: data.title,
        description: data.description,
        isVegetarian: data.isVegetarian,
        ingredients: data.ingredients ? data.ingredients.length : 0,
        instructions: data.instructions ? data.instructions.length : 0,
        createdBy: uid,
        timestamp: new Date().getTime()
    };
    return database.ref("recipes").push(recipe)
        .then((snapshot) => {
            const uid = store.getState().user.uid;
            const key = snapshot.key;
            database.ref(`recipeOwner/${uid}/${key}`).set(true);
            database.ref(`ingredients/${snapshot.key}`).set(data.ingredients);
            database.ref(`instructions/${snapshot.key}`).set(data.instructions);
            store.dispatch(newMessage("You have added a new recipe to the collection", "Success", 3000));
            return true;
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Error", 3000));
            return false;
        })
}



export const EditRecipeInFirebase = (id, data) => {
    const uid = store.getState().user.uid;
    const recipe = {
        title: data.title,
        description: data.description,
        isVegetarian: data.isVegetarian,
        ingredients: data.ingredients ? data.ingredients.length : 0,
        instructions: data.instructions ? data.instructions.length : 0,
        timestamp: new Date().getTime(),
        createdBy: uid,
    }

    const updateObject = {};
    updateObject[`recipes/${id}`] = recipe;
    updateObject[`ingredients/${id}`] = data.ingredients;
    updateObject[`instructions/${id}`] = data.instructions;

    return database.ref().update(updateObject)
        .then(() => {
            store.dispatch(newMessage("Your changes has been saved", "Success", 3000));
            return true;
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Error", 3000));
            return false;
        })
}



export const RemoveRecipeFromFirebase = (id) => {
    const uid = store.getState().user.uid;
    return database.ref(`recipes/${id}`).remove()
        .then(() => {
            database.ref(`ingredients/${id}`).remove();
            database.ref(`instructions/${id}`).remove();
            database.ref(`recipeOwner/${uid}/${id}`).remove();
            store.dispatch(newMessage("This recipe has been removed.", "Success", 3000));
            return true;
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Error", 3000));
            return false;
        });
}























// Firebase Eventlisteners
// Pass in the reference and use the functions to get the data

export function fetchAddRecipes(ref, callback) {
    ref.on("child_added", (snapshot) => {
            const data = { ...snapshot.val(), id: snapshot.key };
            callback(data);
        });
};

export function RemovedRecipes(ref, callback) {
    ref.on("child_removed", snapshot => {
        callback(snapshot.key);
    });
};

export function ChangedRecipes(ref, callback) {
    ref.on("child_changed", snapshot => {
        const data = { ...snapshot.val(), id: snapshot.key };
        callback(data);
    })
};















// 
// Fetch Recipe Details
// 

function GetRecipeMeta(id) {
    return new Promise(function (resolve, reject) {
        database.ref(`recipes/${id}`).once("value")
            .then((snapshot) => {
                resolve({
                    title: snapshot.val().title,
                    description: snapshot.val().description,
                    time: new Date(snapshot.val().timestamp),
                    isVegetarian: snapshot.val().isVegetarian,
                    createdBy: snapshot.val().createdBy,
                    readyOne: true
                });
            });
    });
}

function GetRecipeIngredients(id) {
    return new Promise(function (resolve, reject) {
        database.ref(`ingredients/${id}`).once("value")
            .then((snapshot) => {
                resolve(snapshot.val());
            });
    });
}

function GetRecipeInstructions(id) {
    return new Promise(function (resolve, reject) {
        database.ref(`instructions/${id}`).once("value")
            .then((snapshot) => {
                resolve(snapshot.val());
            });
    });
}

// Get all info about a recipe
export async function AllRecipeInfo(id) {
    const RecipeMeta = await GetRecipeMeta(id);
    const RecipeIngredients = await GetRecipeIngredients(id);
    const RecipeInstructions = await GetRecipeInstructions(id);
    return { RecipeMeta, RecipeIngredients, RecipeInstructions };
}

