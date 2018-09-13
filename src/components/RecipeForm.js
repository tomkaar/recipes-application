import React from "react";
import { connect } from "react-redux";
import { startAddRecipe } from "../actions/recipes";

class RecipeForm extends React.Component {
    state = {
        title: "",
        description: "",
        isVegetarian: false
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
    handleIsVegitarianChange = e => this.setState({ isVegetarian: e.target.checked});

    handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            title: this.state.title,
            description: this.state.description,
            isVegetarian: this.state.isVegetarian,
            timestamp: new Date().getTime(),
            createdBy: this.props.user.uid
        };
        this.props.addRecipe(expense);
    };

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="checkbox"
                        checked={this.state.isVegetarian}
                        onChange={this.handleIsVegitarianChange}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    >
                    </textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (expense) => dispatch(startAddRecipe(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
