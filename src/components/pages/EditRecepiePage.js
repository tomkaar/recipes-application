import React from 'react';

import { database } from "../../firebase/Firebase";
import { EditRecipeInFirebase } from "../../firebase/recipes";

import RecipeForm from "../recipes/RecipeForm";
import PageHeader from "../layout/PageHeader";

import WithLoaderTwo from '../layout/withLoader';

class EditRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || "",
        ingredients: [],
        readyMeta: false,
        readyIngredients: false,
        readyInstructions: false,
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
        database.ref(`instructions/${this.state.id}`).once("value")
            .then((snapshot) => {
                if (snapshot.val() != null) {
                    this.setState(() => ({
                        instructions: snapshot.val(),
                        readyInstructions: true
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
            <div>
                <PageHeader title="Update Recipe" />
                <WithLoaderTwo isLoading={this.state.readyMeta && this.state.readyIngredients && this.state.readyInstructions}>
                    <RecipeForm recipeData={{ ...this.state }} onSubmit={this.onSubmit} />
                </WithLoaderTwo>
            </div>
        )
    }
};

export default EditRecepiePage;
