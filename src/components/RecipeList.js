import React from "react";
import { connect } from "react-redux";
import selectRecipes from "../selectors/selectRecipes";
import RecipeListItem from "./RecipeListItem";

export const RecipeList = (props) => (
    <div className="RecipeList">
        {
            props.recipes.length === 0 ? (
                <div>No Results</div>
            ) : (
                props.recipes.map((expense) => {
                    return <RecipeListItem key={expense.id} {...expense} />;
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => ({
    recipes: selectRecipes(state.recipes, state.filters)
});

export default connect(mapStateToProps)(RecipeList);