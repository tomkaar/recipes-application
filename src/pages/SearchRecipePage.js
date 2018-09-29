import React from 'react';
import { connect } from "react-redux";
import { database } from "../firebase/Firebase";

import store from "../store/store";
import { fetchAddRecipes, RemovedRecipes, ChangedRecipes } from "../firebase/recipes";
import { GetUserLikesFromFirebase } from "../firebase/likes";

import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../actions/recipes";
import selectRecipes from "../selectors/selectRecipes";

import RecipeListFilters from "../components/recipes/RecipeListFilters";
import RecipeList from "../components/recipes/RecipeList";
import WithLoaderTwo from '../components/layout/withLoader';

class SearchRecipePage extends React.Component {

    state = {
        recipes: []
    }

    componentDidMount() {
        this.firebaseRef = database.ref("recipes");
        
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

        GetUserLikesFromFirebase(store.getState().user.uid);
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return (
            <div className="SearchRecipePage">
                <RecipeListFilters />
                <WithLoaderTwo isLoading={this.state.recipes.length > 0}>
                    <RecipeList recipes={selectRecipes(this.state.recipes, this.props.filters)} />
                </WithLoaderTwo>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(SearchRecipePage);
