import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
                    ready: true
                }));
            });
    }

    render() {
        // const PageWithLoader = withLoader();
        return(
            (this.state.ready) ? (
                <div className="wrapper">
                    <div className="RecipeDetails-top">
                        <h2>{this.state.meta.title}</h2>
                    </div>
                    <div className="RecipeDetails-left">
                        <p>{`${this.state.meta.time.getDate()}/${this.state.meta.time.getMonth()} - ${this.state.meta.time.getFullYear()} ${this.state.meta.time.getHours()}:${this.state.meta.time.getMinutes()}`}</p>
                        <p>{this.state.meta.description}</p>
                    </div>
                    <div className="RecipeDetails-right">
                        <div>
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
                </div>
            ) : (
                !this.state.error ? <h2>Loading..</h2> : <h2>Opps Someting went wrong</h2> 
            )
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(DetailedRecepiePage));
