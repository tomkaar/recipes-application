import React from "react";
import RecipeListItem from "./RecipeListItem";

export const RecipeList = (props) => (
    <div className="RecipeList">
        <div className="wrapper">
            {console.log(props.recipes.length)}
            {!props.recipes ? <h2>No Results</h2> : (
                props.recipes.length === 0 ? (
                    <div className="RecipeList-NoResult">
                        <h2>Loading..</h2>
                    </div>
                ) : (
                        props.recipes.reverse().map((recipe) => {
                            return <RecipeListItem key={recipe.id} {...recipe} />;
                        })
                    )
                )
            }
        </div>
    </div>
);

export default RecipeList;