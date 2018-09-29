import React from 'react';

import { database } from "../firebase/Firebase";
import { fetchAddRecipes, RemovedRecipes, ChangedRecipes } from "../firebase/recipes";
import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../actions/recipes";

import OrderByLatest from "./../selectors/orderByLatest";

import RecipeList from "../components/recipes/RecipeList";
import PageHeader from "../components/layout/PageHeader";

import WithLoaderTwo from '../components/layout/withLoader';

class DashboardPage extends React.Component {

    state = {
        recipes: []
    }

    componentDidMount() {
        this.firebaseRef = database.ref("recipes").limitToLast(10);

        fetchAddRecipes(this.firebaseRef, recipe => {
            this.setState((prevState) => ({
                recipes: AddRecipeToState(prevState.recipes, recipe)
            }))
        });

        RemovedRecipes(this.firebaseRef, recipe => {
            this.setState((prevState) => ({
                recipes: RemoveRecipeFromState(prevState.recipes, recipe)
            }))
        });

        ChangedRecipes(this.firebaseRef, recipe => {
            this.setState((prevState) => ({
                recipes: EditRecipeOnState(prevState.recipes, recipe)
            }))
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return (
            <WithLoaderTwo isLoading={this.state.recipes.length > 0} >
                <PageHeader title="Recently added" />
                <RecipeList recipes={OrderByLatest(this.state.recipes.slice(-10))} />
            </WithLoaderTwo>
        )
    }
}

export default DashboardPage;
