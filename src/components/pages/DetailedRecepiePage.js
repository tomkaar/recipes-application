import React from 'react';
import { withRouter } from "react-router-dom";

import withLoader from "../layout/withLoader";
import { AllRecipeInfo } from "../../actions/recipes";
import RecipeDetails from "../recipes/RecipeDetails";

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
        const DetailedRecipePageWithLoader = withLoader(RecipeDetails);
        return(
            <DetailedRecipePageWithLoader
                isLoading={this.state.ready}
                state={this.state} />
        )
    }
};

export default withRouter(DetailedRecepiePage);