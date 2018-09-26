import React from 'react';

import { fetchAddRecipes, RemovedRecipes, ChangedRecipes } from "../../actions/recipes";

import { database } from "../../firebase/Firebase";
import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../../actions/recipes";
import OrderByLatest from "../../selectors/orderByLatest";
import RecipeList from "../recipes/RecipeList";
import PageHeader from "../layout/PageHeader";
import withLoader from '../layout/withLoader';

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
        const RecipeListWithLoader = withLoader(RecipeList);
        return (
            <div className="DashboardPage">
                <PageHeader title="Recently added" />
                <RecipeListWithLoader 
                    isLoading={this.state.recipes.length > 0} 
                    recipes={OrderByLatest(this.state.recipes.slice(-10))}
                />
            </div>
        )
    }
}

export default DashboardPage;
