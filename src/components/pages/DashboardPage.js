import React from 'react';
import { connect } from "react-redux";

import { database } from "../../firebase/Firebase";
import { addRecipe, removeRecipe, editRecipe, clearRecipe } from '../../actions/recipes';
import RecipeList from "../recipes/RecipeList";
import PageHeader from "../layout/PageHeader";

class DashboardPage extends React.Component {
    state = {
        ref: ""
    }

    componentDidMount() {
        this.props.clearRecipes();

        const ref = database.ref("recipes");
        this.setState(() => ({ ref }));

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
            const data = { ...snapshot.val(), id: snapshot.key };
            this.props.editRecipe(snapshot.key, data);
        })
    }

    componentWillUnmount() {
        this.state.ref.off();
        this.props.clearRecipes();
    }

    render() {
        return (
            <div className="DashboardPage">
                <PageHeader title="Recently added" />
                <RecipeList recipes={this.props.recipes.slice(-10)} />
            </div>
        )
    }
}

// access current redux state
const mapStateToProps = (state) => ({
    recipes: state.recipes
});

// access redux actions to modify state
const mapDispatchToProps = (dispatch) => ({
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    editRecipe: (id, updated) => dispatch(editRecipe(id, updated)),
    removeRecipe: (id) => dispatch(removeRecipe(id)),
    clearRecipes: () => dispatch(clearRecipe())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
