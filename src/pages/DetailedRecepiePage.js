import React from 'react';
import { withRouter } from "react-router-dom";

import WithLoaderTwo from "../components/layout/withLoader";
import { AllRecipeInfo } from "../firebase/recipes";
import RecipeDetails from "../components/recipes/RecipeDetails";

class DetailedRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || "",
        meta: {},
        ingredients: [],
        instructions: [],
        ready: false
    }

    componentDidMount() {
        AllRecipeInfo(this.state.id)
            .then((res) => {
                this.setState(() => ({
                    meta: res.RecipeMeta,
                    ingredients: res.RecipeIngredients,
                    instructions: res.RecipeInstructions,
                    ready: true
                }));
            });
    }

    render() {
        return(
            <WithLoaderTwo isLoading={this.state.ready}>
                <RecipeDetails state={this.state} />
            </WithLoaderTwo>
        )
    }
};

export default withRouter(DetailedRecepiePage);