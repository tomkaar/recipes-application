export default (recipes) => {
    return recipes.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
}