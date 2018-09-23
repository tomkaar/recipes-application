import React from "react";
import RecipeListItem from "./RecipeListItem";

const RecipeList = (props) => (
    <div className="RecipeList">
        <div className="wrapper">
            {
                props.recipes.reverse().map((recipe) => {
                    return <RecipeListItem key={recipe.id} {...recipe} />;
                })
            }
        </div>
    </div>
);

export default RecipeList;
