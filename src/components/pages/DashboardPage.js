import React from 'react';

import store from "../../store/store";
import { GetUserLikesFromFirebase } from "../../actions/recipes";

import { database } from "../../firebase/Firebase";
import { AddRecipeToState, RemoveRecipeFromState, EditRecipeOnState } from "../../actions/recipes";
import OrderByLatest from "../../selectors/orderByLatest";
import RecipeList from "../recipes/RecipeList";
import PageHeader from "../layout/PageHeader";

class DashboardPage extends React.Component {

    state = {
        firebaseRef: "",
        newItems: false,
        error: false,
        errorMessage: "",
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
            .limitToLast(10)
            .orderByChild("timestamp")
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
            <div className="DashboardPage">
                <PageHeader title="Recently added" para="No Redux" />
                <RecipeList recipes={OrderByLatest(this.state.recipes.slice(-10))} />
            </div>
        )
    }
}

export default DashboardPage;