import React from "react";
import RecipeListItem from "./RecipeListItem";

export const RecipeList = (props) => (
    <div className="RecipeList">
        {
            props.recipes.length === 0 ? (
                <div>No Results</div>
            ) : (
                props.recipes.map((recipe) => {
                        return <RecipeListItem key={recipe.id} {...recipe} />;
                })
            )
        }
    </div>
);

export default RecipeList;