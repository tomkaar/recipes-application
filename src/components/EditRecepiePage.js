import React from 'react';
import { connect } from "react-redux";

import { database } from "../firebase/Firebase";
import { firebaseAddRecipe } from "../actions/recipes";
import RecipeForm from "./RecipeForm";

class EditRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || ""
    }

    componentWillMount() {
        database.ref(`recipes/${this.state.id}`).once("value")
            .then((snapshot) => {
                this.setState(() => ({
                    title: snapshot.val().title,
                    description: snapshot.val().description,
                    isVegetarian: snapshot.val().isVegetarian,
                 }));
            })
    }

    onSubmit = (recipe) => {
        const fullRecipeData = {
            ...recipe,
            createdBy: this.props.user.uid,
            timestamp: new Date().getTime()
        };
        console.log(fullRecipeData);
        // this.props.addRecipe(fullRecipeData);
    };

    render() {
        return(
            <div>
                <h1>Edit Recpie</h1>
                <RecipeForm recipeData={{ ...this.state }} onSubmit={this.onSubmit} />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (expense) => dispatch(firebaseAddRecipe(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecepiePage);
