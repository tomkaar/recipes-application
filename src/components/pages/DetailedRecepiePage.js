import React from 'react';
import { withRouter } from "react-router-dom";

import { AllRecipeInfo } from "../../actions/recipes";

class DetailedRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || "",
        meta: {},
        ingredients: [],
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
            (this.state.ready) ? (
                <div className="wrapper">
                    <div className="RecipeDetails-top">
                        <h2>{this.state.meta.title}</h2>
                        <p>{`${this.state.meta.time.getDate()}/${this.state.meta.time.getMonth()} - ${this.state.meta.time.getFullYear()} ${this.state.meta.time.getHours()}:${this.state.meta.time.getMinutes()}`}</p>
                    </div>
                    <div className="RecipeDetails-left">
                        <div className="RecipeDetails-Meta">
                            <p className="RecipeDetails-Meta__description">{this.state.meta.description}</p>
                            {this.state.meta.isVegetarian && (
                                <p className="RecipeDetails-Meta_vegetarian">
                                    <input type="checkbox" disabled checked={true} /> Is Vegetarian
                                </p>
                            )}
                        </div>
                        <div className="RecipeDetails-Ingredients">
                            <h3>Ingredients</h3>
                            <ul>
                                {this.state.ingredients.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {`${ingredient.amount}${ingredient.measure} ${ingredient.text}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="RecipeDetails-right">
                        <div className="RecipeDetails-Instructions">
                            <h3>Instructions</h3>
                            <ol>
                                {this.state.instructions.map((instruction, index) => (
                                    <li key={instruction.id}>
                                        {instruction.text}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            ) : (
                <h2>Loading..</h2>
            )
        )
    }
};

export default withRouter(DetailedRecepiePage);