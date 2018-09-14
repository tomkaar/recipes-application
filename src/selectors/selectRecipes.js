export default (expenses, { text, sortBy, isVegetarian }) => {
    return expenses.filter( (expense) => {
        const textMatch = expense.title.toLowerCase().includes(text.toLowerCase());
        const isVegetarianMatch = expense.isVegetarian.toString() === isVegetarian.toString() || isVegetarian.toString() === "all";
        return textMatch && isVegetarianMatch;
    })
    .sort((a, b) => {
        if(sortBy === "latest") {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortBy === "oldest") {
            return a.createdAt < b.createdAt ? -1 : 1;
        }
        else {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
    });
}