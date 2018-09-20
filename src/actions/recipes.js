import { database } from "../firebase/Firebase";
import { newMessage } from "./messages";
import store from "../store/store";



// State modification
// These are called from the firebase eventlisteners 
// Used to modify the state and reduce common errors

// add recipe to state if the id does not already exist
export const AddRecipeToState = (prevState, recipe) => {
    const exists = prevState.filter(res => res.id === recipe.id);
    if (!Array.isArray(exists) || !exists.length) {
        return [...prevState, recipe];
    } else { return prevState; }
}

// remove Recipe from state by using the Recipe Uniqe id
export const RemoveRecipeFromState = (prevState, removeID) => {
    return prevState.filter(({ id }) => id !== removeID);
}

// Look for the unique id and update the recipe if there's a match
export const EditRecipeOnState = (prevState, data) => {
    return prevState.map((recipe) => {
        if (recipe.id === data.id) {
            return { ...recipe, ...data };
        } else { return recipe; }
    });
}






// Firebase modification
// These functions update firebase
// when firebase is updated, the eventlisteners will be triggered and update the application everywhere

export const AddRecipeToFirebase = (data) => {
    const uid = store.getState().user.uid;
    const recipe = {
        title: data.title,
        description: data.description,
        isVegetarian: data.isVegetarian,
        ingredients: data.ingredients ? data.ingredients.length : 0,
        createdBy: uid,
        timestamp: new Date().getTime()
    };
    return database.ref("recipes").push(recipe)
        .then((snapshot) => {
            const key = snapshot.key;
            database.ref(`recipeOwner/${uid}`).update({ [key]: true });
            database.ref(`ingredients/${snapshot.key}`).set(data.ingredients);
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
        timestamp: new Date().getTime(),
        createdBy: uid,
    }

    const updateObject = {};
    updateObject[`recipes/${id}`] = recipe;
    updateObject[`ingredients/${id}`] = data.ingredients;

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
            database.ref(`recipeOwner/${uid}/${id}`).remove();
            store.dispatch(newMessage("This recipe has been removed.", "Success", 3000));
            return true;
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "Error", 3000));
            return false;
        });
}






// Like Button

// Add Like
export const AddLikeToFirebase = (recipe_id) => {
    const uid = store.getState().user.uid;
    
    const updateObject = {};
    updateObject[`user_likes/${uid}/${recipe_id}`] = true;
    updateObject[`recipe_likes/${recipe_id}/${uid}`] = true;

    database.ref().update(updateObject)
        .then((res) => {
            AddUserLikeToState(recipe_id);
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "error", 5000));
        });
}

// Remove Like
export const RemoveLikeFromFirebase = (recipe_id) => {
    const uid = store.getState().user.uid;

    const updateObject = {};
    updateObject[`user_likes/${uid}/${recipe_id}`] = null;
    updateObject[`recipe_likes/${recipe_id}/${uid}`] = null;

    database.ref().update(updateObject)
        .then((res) => {
            RemoveUserLikeFromState(recipe_id);
        })
        .catch(error => {
            store.dispatch(newMessage(error.message, "error", 5000));
        });
}







// Likes
// On page load -> Fetch recipes and store in state
// When RecipeItem is loaded check if id exists in state

const setLikes = (likes) => ({
    type: "SET_LIKES", likes
});

const addLike = (id) => ({
    type: "ADD_LIKE", id
});

const removeLike = (id) => ({
    type: "REMOVE_LIKE", id
});

export function GetUserLikesFromFirebase(uid) {
    database.ref(`user_likes/${uid}`).once("value")
        .then((snapshot) => {
            if(snapshot.val() !== null){
                const keys = Object.keys(snapshot.val());
                store.dispatch(setLikes(keys));
                return keys;
            }
        })
}

export function AddUserLikeToState(id) {
    store.dispatch(addLike(id)); 
}

export function RemoveUserLikeFromState(id) {
    store.dispatch(removeLike(id));
}

export function UserHasLiked(id) {
    const likes = store.getState().user.likes;
    const filter = likes.filter(like => like === id);
    if (!Array.isArray(filter) || !filter.length) { return false; }
    else { return true; }
}
