export default (recipes, { text, sortBy, isVegetarian }) => {
    return recipes.filter( (recipe) => {
        const textMatch = recipe.title.toLowerCase().includes(text.toLowerCase());
        const isVegetarianMatch = recipe.isVegetarian.toString() === isVegetarian.toString() || isVegetarian.toString() === "all";
        return textMatch && isVegetarianMatch;
    })
    .sort((a, b) => {
        if(sortBy === "latest") {
            return a.timestamp < b.timestamp ? -1 : 1;
        }
        else if (sortBy === "oldest") {
            return a.timestamp < b.timestamp ? 1 : -1;
        }
        else {
            return a.timestamp < b.timestamp ? -1 : 1;
        }
    });
}