import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { database } from "../../firebase/Firebase";
import { EditRecipeInFirebase } from "../../actions/recipes";

import RecipeForm from "../recipes/RecipeForm";
import PageHeader from "../layout/PageHeader";

class EditRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || "",
        ingredients: [],
        readyMeta: false,
        readyIngredients: false,
        error: false
    }

    componentDidMount() {
        database.ref(`recipes/${this.state.id}`).once("value")
            .then((snapshot) => {
                if(snapshot.val() != null){
                    this.setState(() => ({
                        title: snapshot.val().title,
                        description: snapshot.val().description,
                        isVegetarian: snapshot.val().isVegetarian,
                        readyMeta: true
                    }));
                } else {
                    this.setState(() => ({ error: true }))
                }
            })
        database.ref(`ingredients/${this.state.id}`).once("value")
            .then((snapshot) => {
                if (snapshot.val() != null) {
                    this.setState(() => ({
                        ingredients: snapshot.val(),
                        readyIngredients: true
                    }));
                } else {
                    this.setState(() => ({ error: true }))
                }
            })
    }

    onSubmit = (recipe) => {
        EditRecipeInFirebase(this.state.id, recipe)
            .then((res) => {
                res && this.props.history.push('/');
            });
    };

    render() {
        return(
            (this.state.readyMeta && this.state.readyIngredients) ? (
                <div>
                    <PageHeader title="Update Recipe" />
                    <RecipeForm recipeData={{ ...this.state }} onSubmit={this.onSubmit} />
                </div>
            ) : (
                !this.state.error ? <h2>Loading..</h2> : <h2>Opps Someting went wrong</h2>
            )
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(EditRecepiePage));
