import React from 'react';
import { connect } from "react-redux";
import { database } from "../../firebase/Firebase";

import store from "../../store/store";
import { GetUserLikesFromFirebase } from "../../actions/recipes";

import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../../actions/recipes";
import selectRecipes from "../../selectors/selectRecipes";

import RecipeListFilters from "../recipes/RecipeListFilters";
import RecipeList from "../recipes/RecipeList";

class SearchRecipePage extends React.Component {

    state = {
        firebaseRef: "",
        newItems: false,
        error: false,
        recipes: []
    }

    componentWillMount() {
        const firebaseRef = database.ref("recipes");
        this.setState(() => ({ firebaseRef }));

        firebaseRef.limitToLast(10).once("value")
            .then((snapshot) => {
                const data = [];
                for (const key in snapshot.val()) {
                    data.push({
                        ...snapshot.val()[key], id: key
                    });
                }
                this.setState(() => ({
                    recipes: data
                }))
            }).catch((error) => {
                this.setState(() => ({
                    error: true,
                    errorMessage: error.message
                }))
            })

        GetUserLikesFromFirebase(store.getState().user.uid);
    }

    componentDidMount() {
        this.state.firebaseRef
            .on("child_added", (snapshot) => {
                const data = { ...snapshot.val(), id: snapshot.key };
                this.setState((prevState) => ({
                    recipes: AddRecipeToState(prevState.recipes, data)
                }))
            }).bind(this);


        this.state.firebaseRef.on("child_removed", snapshot => {
            this.setState((prevState) => ({
                recipes: RemoveRecipeFromState(prevState.recipes, snapshot.key)
            }))
        })

        this.state.firebaseRef.on("child_changed", snapshot => {
            const data = { ...snapshot.val(), id: snapshot.key };
            this.setState((prevState) => ({
                recipes: EditRecipeOnState(prevState.recipes, data)
            }))
        })
    }

    componentWillUnmount() {
        this.state.firebaseRef.off();
    }

    render() {
        return (
            <div className="SearchRecipePage">
                <RecipeListFilters />
                <RecipeList recipes={selectRecipes(this.state.recipes, this.props.filters)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(SearchRecipePage);
