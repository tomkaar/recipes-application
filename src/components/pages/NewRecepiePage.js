import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { firebaseAddRecipe } from "../../actions/recipes";

import RecipeForm from "../recipes/RecipeForm";
import PageHeader from "../layout/PageHeader";

class NewRecepiePage extends React.Component {
    onSubmit = (recipe) => {
        this.props.addRecipe(recipe)
            .then((res) => {
                res && this.props.history.push('/');
            });
    };

    render() {
        return(
            <div>
                <PageHeader title="Submit a Recipe" />
                <RecipeForm onSubmit={this.onSubmit} />
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (expense) => dispatch(firebaseAddRecipe(expense))
});

export default withRouter(connect(null, mapDispatchToProps)(NewRecepiePage));
