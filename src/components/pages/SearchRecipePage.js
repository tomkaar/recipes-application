import React from 'react';
import { connect } from "react-redux";
import { database } from "../../firebase/Firebase";

import store from "../../store/store";
import { GetUserLikesFromFirebase } from "../../actions/recipes";

import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../../actions/recipes";
import selectRecipes from "../../selectors/selectRecipes";

import RecipeListFilters from "../recipes/RecipeListFilters";
import RecipeList from "../recipes/RecipeList";
import withLoader from '../layout/withLoader';

class SearchRecipePage extends React.Component {

    state = {
        error: false,
        recipes: []
    }

    componentDidMount() {
        this.firebaseRef = database.ref("recipes");
        
        this.firebaseRef
            .on("child_added", (snapshot) => {
                const data = { ...snapshot.val(), id: snapshot.key };
                this.setState((prevState) => ({
                    recipes: AddRecipeToState(prevState.recipes, data)
                }))
            }).bind(this);


        this.firebaseRef.on("child_removed", snapshot => {
            this.setState((prevState) => ({
                recipes: RemoveRecipeFromState(prevState.recipes, snapshot.key)
            }))
        })

        this.firebaseRef.on("child_changed", snapshot => {
            const data = { ...snapshot.val(), id: snapshot.key };
            this.setState((prevState) => ({
                recipes: EditRecipeOnState(prevState.recipes, data)
            }))
        })

        GetUserLikesFromFirebase(store.getState().user.uid);
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        const RecipeListWithLoader = withLoader(RecipeList);
        return (
            <div className="SearchRecipePage">
                <RecipeListFilters />
                <RecipeListWithLoader
                    isLoading={this.state.recipes.length > 0}
                    recipes={selectRecipes(this.state.recipes, this.props.filters)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(SearchRecipePage);
