export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

export const setIsVegetarianFilter = (isVegetarian) => ({
    type: "SET_IS_VEGETARIAN",
    isVegetarian: isVegetarian
});

export const sortByLatest = () => ({
    type: "SORT_BY_LATEST",
});
export const sortByOldest = () => ({
    type: "SORT_BY_OLDEST",
});