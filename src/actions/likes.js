import store from "../store/store";

export const setLikes = (likes) => ({
    type: "SET_LIKES", likes
});
export const addLike = (id) => ({
    type: "ADD_LIKE", id
});
export const removeLike = (id) => ({
    type: "REMOVE_LIKE", id
});

export function AddUserLikeToState(id) {
    store.dispatch(addLike(id));
}
export function RemoveUserLikeFromState(id) {
    store.dispatch(removeLike(id));
}
