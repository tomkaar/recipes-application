import React from 'react';
import store from "../../store/store";
import LikeButton from "../layout/LikeButton";
import CreatedByButtons from "../layout/CreatedByButtons";

class RecipeDetails extends React.Component {

    state = {
        liked: false
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(() => ({
                liked: store.getState().user.likes.includes(this.props.state.id)
            }))
        })
        this.setState(() => ({
            liked: store.getState().user.likes.includes(this.props.state.id)
        }))
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        return (
            <div className="wrapper">
                <div className="RecipeDetails-top">
                    <h2>{this.props.state.meta.title}</h2>
                    <p>{`${this.props.state.meta.time.getDate()}/${this.props.state.meta.time.getMonth()} - ${this.props.state.meta.time.getFullYear()} ${this.props.state.meta.time.getHours()}:${this.props.state.meta.time.getMinutes()}`}</p>
                </div>
                <div className="RecipeDetails-left">
                    <div className="RecipeDetails-Buttons">
                        {store.getState().user.loggedIn && (
                            <LikeButton
                                id={this.props.state.id}
                                hasLiked={this.state.liked}
                            />
                        )}
                        {store.getState().user.uid === this.props.state.meta.createdBy && (
                            <CreatedByButtons id={this.props.state.id} />
                        )}
                    </div>
                    <div className="RecipeDetails-Meta">
                        <p className="RecipeDetails-Meta__description">{this.props.state.meta.description}</p>
                        {this.props.state.meta.isVegetarian && (
                            <p className="RecipeDetails-Meta_vegetarian">
                                <input type="checkbox" disabled checked={true} /> Is Vegetarian
                        </p>
                        )}
                    </div>
                    <div className="RecipeDetails-Ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            {this.props.state.ingredients.map((ingredient) => (
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
                            {this.props.state.instructions.map((instruction, index) => (
                                <li key={instruction.id}>
                                    {instruction.text}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeDetails;