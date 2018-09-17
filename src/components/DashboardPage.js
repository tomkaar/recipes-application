import React from 'react';
import { connect } from "react-redux";
import { database } from "../firebase/Firebase";
import { addRecipe, removeRecipe, editRecipe, clearRecipe, setRecipe } from '../actions/recipes';
import RecipeList from "./RecipeList";
import PageHeader from "./PageHeader";

class DashboardPage extends React.Component {
    state = {
        ref: ""
    }

    componentDidMount() {
        const ref = database.ref("recipes");
        this.setState(() => ({ ref }));
        this.props.clearRecipes();
        ref.limitToLast(10)
            .orderByChild("timestamp")
            .on("child_added", (snapshot) => {
                this.props.addRecipe({ 
                    ...snapshot.val(), id: snapshot.key
                });
            }).bind(this);
        ref.on("child_removed", snapshot => {
            this.props.removeRecipe(snapshot.key);
        })
        ref.on("child_changed", snapshot => {
            this.props.editRecipe(snapshot.key, { ...snapshot.val(), id: snapshot.key});
        })
    }

    componentWillUnmount() {
        this.state.ref.off();
        this.props.clearRecipes();
    }

    render() {
        return (
            <div className="DashboardPage">
                <PageHeader title="Last 10 Recipes Added" />
                <RecipeList recipes={this.props.recipes.slice(-10)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes
});

const mapDispatchToProps = (dispatch) => ({
    setRecipes: (recipes) => dispatch(setRecipe(recipes)),
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    editRecipe: (id, updated) => dispatch(editRecipe(id, updated)),
    removeRecipe: (id) => dispatch(removeRecipe(id)),
    clearRecipes: () => dispatch(clearRecipe())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);