import store from "../store/store";
import { database } from "../firebase/Firebase";

import { newMessage } from "../actions/messages";
import { setLikes, AddUserLikeToState, RemoveUserLikeFromState } from "../actions/likes";



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



export function UserHasLiked(id) {
    const likes = store.getState().user.likes;
    const filter = likes.filter(like => like === id);
    if (!Array.isArray(filter) || !filter.length) { return false; }
    else { return true; }
}



// Get All Likes from a User
export function GetUserLikesFromFirebase(uid) {
    database.ref(`user_likes/${uid}`).once("value")
        .then((snapshot) => {
            if (snapshot.val() !== null) {
                const keys = Object.keys(snapshot.val());
                store.dispatch(setLikes(keys));
                return keys;
            }
        })
}
