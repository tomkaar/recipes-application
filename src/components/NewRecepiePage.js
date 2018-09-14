import React from 'react';
import { connect } from "react-redux";

import { firebaseAddRecipe } from "../actions/recipes";
import RecipeForm from "./RecipeForm";

class NewRecepiePage extends React.Component {

    onSubmit = (recipe) => {
        const fullRecipeData = {
            ...recipe,
            createdBy: this.props.user.uid,
            timestamp: new Date().getTime()
        };
        this.props.addRecipe(fullRecipeData);
    };

    render() {
        return(
            <div>
                <h1>Add a recipe</h1>
                <RecipeForm onSubmit={this.onSubmit} />
            </div>
        )
    }

};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (expense) => dispatch(firebaseAddRecipe(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRecepiePage);
