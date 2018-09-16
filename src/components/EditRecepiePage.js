import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { database } from "../firebase/Firebase";
import { firebaseEditRecipe } from "../actions/recipes";

import RecipeForm from "./RecipeForm";
import PageHeader from "./PageHeader";

class EditRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || ""
    }

    componentWillMount() {
        database.ref(`recipes/${this.state.id}`).once("value")
            .then((snapshot) => {
                this.setState(() => ({
                    title: snapshot.val().title,
                    description: snapshot.val().description,
                    isVegetarian: snapshot.val().isVegetarian,
                 }));
            })
    }

    onSubmit = (recipe) => {
        this.props.editRecipe(this.state.id, recipe)
            .then((res) => {
                res && this.props.history.push('/');
            });
    };

    render() {
        return(
            <div>
                <PageHeader title="Update Recipe" />
                <RecipeForm recipeData={{ ...this.state }} onSubmit={this.onSubmit} />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    editRecipe: (id, updates) => dispatch(firebaseEditRecipe(id, updates))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecepiePage));
