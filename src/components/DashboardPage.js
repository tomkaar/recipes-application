import React from 'react';
import { connect } from "react-redux";
import { database } from "../firebase/Firebase";
import { addRecipe, clearRecipe, setRecipe } from '../actions/recipes';
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
        ref.limitToLast(2)
            .orderByChild("timestamp")
            .on("child_added", (snapshot) => {
                this.props.addRecipe({ 
                    ...snapshot.val(), id: snapshot.key
                });
            }).bind(this);
    }

    componentWillUnmount() {
        this.state.ref.off();
        this.props.clearRecipes();
    }

    render() {
        return (
            <div className="DashboardPage">
                <PageHeader title="Last 10" para="This is the last 10 recipes added to the collection" />
                <RecipeList recipes={this.props.recipes.slice(-2)} />
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
    clearRecipes: () => dispatch(clearRecipe())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);