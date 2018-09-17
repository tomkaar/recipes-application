import React from "react";
import RecipeListItem from "./RecipeListItem";

export const RecipeList = (props) => (
    <div className="RecipeList">
        <div className="wrapper">
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
    </div>
);

export default RecipeList;