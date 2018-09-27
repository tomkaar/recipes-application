// These are called from the firebase eventlisteners 
// Used to modify the state

// add recipe to state if the id does not already exist
export const AddRecipeToState = (prevState, recipe) => {
    const exists = prevState.filter(res => res.id === recipe.id);
    if (!Array.isArray(exists) || !exists.length) {
        return [...prevState, recipe];
    } else { return prevState; }
}

// remove Recipe from state by using the recipe_id
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
