import React from 'react';
import { connect } from "react-redux";
import { database } from "../../firebase/Firebase";
import { addRecipe, removeRecipe, editRecipe, clearRecipe } from '../../actions/recipes';
import selectRecipes from "../../selectors/selectRecipes";

import RecipeListFilters from "../recipes/RecipeListFilters";
import RecipeList from "../recipes/RecipeList";

class DashboardPage extends React.Component {
    state = {
        ref: "",
    }

    componentDidMount() {
        this.props.clearRecipes();
        const ref = database.ref("recipes");
        this.setState(() => ({ ref }))
        
        ref.orderByChild("title")
            .startAt(this.props.filters.text)
            .endAt(this.props.filters.text + "\uf8ff")
            .on("child_added", (snapshot) => {
                this.props.addRecipe({
                    ...snapshot.val(), id: snapshot.key
                })
        })
        ref.on("child_removed", snapshot => {
            this.props.removeRecipe(snapshot.key);
        })
        ref.on("child_changed", snapshot => {
            this.props.editRecipe(snapshot.key, { ...snapshot.val(), id: snapshot.key });
        })
    }

    componentWillUnmount() {
        this.state.ref.off();
        this.props.clearRecipes();
    }

    render() {
        return (
            <div className="SerachRecipePage">
                <RecipeListFilters />
                <RecipeList recipes={selectRecipes(this.props.recipes, this.props.filters)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (recipe) => dispatch(addRecipe(recipe)),
    editRecipe: (id, updated) => dispatch(editRecipe(id, updated)),
    removeRecipe: (id) => dispatch(removeRecipe(id)),
    clearRecipes: () => dispatch(clearRecipe())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);