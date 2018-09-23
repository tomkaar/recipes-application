import React from 'react';

import store from "../../store/store";
import { GetUserLikesFromFirebase } from "../../actions/recipes";

import { database } from "../../firebase/Firebase";
import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../../actions/recipes";
import OrderByLatest from "../../selectors/orderByLatest";
import RecipeList from "../recipes/RecipeList";
import PageHeader from "../layout/PageHeader";
import withLoader from '../layout/withLoader';

class DashboardPage extends React.Component {

    state = {
        error: false,
        errorMessage: "",
        recipes: []
    }

    componentDidMount() {
        this.firebaseRef = database.ref("recipes");

        this.firebaseRef
            .limitToLast(10)
            .orderByChild("timestamp")
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