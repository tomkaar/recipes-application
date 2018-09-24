import React from "react";
import { connect } from "react-redux";
import { newMessage } from '../../actions/messages';
import { highest } from "../../selectors/highest";

class RecipeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.recipeData ? props.recipeData.id : "",
            title: props.recipeData ? props.recipeData.title : "",
            description: props.recipeData ? props.recipeData.description : "",
            isVegetarian: props.recipeData ? props.recipeData.isVegetarian : false,
            ingredients: props.recipeData ? props.recipeData.ingredients : [],
            instructions: props.recipeData ? props.recipeData.instructions : [],
            uid: props.recipeData ? highest(props.recipeData.ingredients) : 0,
            instructionsid: props.recipeData ? highest(props.recipeData.instructions) : 0
        }
    }
    
    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
    handleIsVegitarianChange = e => this.setState({ isVegetarian: e.target.checked});

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.ingredients.length < 1){
            this.props.newMessage("You need to add at least one ingredient before submitting", "Error", 5000);
        } else {
            this.props.onSubmit({
                title: this.state.title,
                description: this.state.description,
                isVegetarian: this.state.isVegetarian,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions
            });
        }
    }

    AddIngredient = (e) => {
        e.preventDefault()
        const uid = this.state.uid + 1;
        this.setState(() => ({ uid }))
        const newIngredient = {
            id: uid,
            amount: this.ingredientAmount.value,
            measure: this.ingredientMeasure.value,
            text: this.ingredientText.value
        }
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, newIngredient]
        }));
        this.ingredientAmount.value = "";
        this.ingredientMeasure.value = "";
        this.ingredientText.value = "";
        this.ingredientAmount.focus();
    }

    removeIngredient = (id) => {
        const removed = this.state.ingredients.filter((i) => i.id !== id);
        this.setState(() => ({ ingredients: removed }))
    }





    AddInstruction = (e) => {
        e.preventDefault()
        const instructionsid = this.state.instructionsid + 1;
        this.setState(() => ({ instructionsid }))
        const newInstruction = {
            id: instructionsid,
            text: this.instructionText.value
        }
        this.setState((prevState) => ({
            instructions: [...prevState.instructions, newInstruction]
        }));
        this.instructionText.value = "";
        this.instructionText.focus();
    }

    removeInstruction = (id) => {
        const removed = this.state.instructions.filter((i) => i.id !== id);
        this.setState(() => ({ instructions: removed }))
    }





    render() {
        return(
            <div className="RecipeForm">

                <div className="RecipeForm-Sidebar">
                    <div className="RecipeForm-Meta">
                        <h3>Information</h3>
                        <form onSubmit={this.onSubmit}>
                            <label className="Label">
                                Title:
                            <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    autoFocus={true}
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                    className="Input"
                                />
                            </label>
                            <label className="Label">
                                Description:
                            <textarea
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    className="Textarea"
                                >
                                </textarea>
                            </label>
                            <label className="Label checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.isVegetarian}
                                    onChange={this.handleIsVegitarianChange}
                                /> <span>Vegetarian</span>
                            </label>
                        </form>
                    </div>
                    <div className="RecipeForm-Ingredients">
                        <h3>Ingredients</h3>
                        {this.state.ingredients.length > 0 ? (
                            <div className="RecipeForm-ingredients__ul">
                                {this.state.ingredients.map(ingredient => (
                                    <li className="RecipeForm-ingredients__item" key={ingredient.id}>
                                        <button
                                            onClick={(e) => { this.removeIngredient(ingredient.id) }}
                                            className="Button is-small"
                                        >X</button>
                                        {ingredient.amount}{ingredient.measure} {ingredient.text}
                                    </li>
                                ))}
                            </div>
                        ) : (
                                <p className="NoIngredients">No ingredients</p>
                        )}

                        <form onSubmit={this.AddIngredient}>
                            <input
                                type="number"
                                placeholder="Amount"
                                required
                                ref={node => this.ingredientAmount = node}
                                className="Input RecipeForm-ingredients__amount" />
                            <input
                                type="text"
                                placeholder="Mesure"
                                required
                                ref={node => this.ingredientMeasure = node}
                                className="Input RecipeForm-ingredients__Mesure" />
                            <input
                                type="text"
                                placeholder="Ingredient"
                                required
                                ref={node => this.ingredientText = node}
                                className="Input RecipeForm-ingredients__Ingredient" />
                            <button type="submit" className="Button RecipeForm-ingredients__Button">Add</button>
                        </form>
                    </div>
                </div>
                <div className="RecipeForm-Content">
                    <div className="RecipeForm-Instruction">
                        <div>
                            <h3>Instructions</h3>
                            {this.state.instructions.length > 0 ? (
                                <div>
                                    {this.state.instructions.map((instruction, index) => (
                                        <div className="RecipeForm-instructions__item" key={instruction.id}>

                                            <button
                                                onClick={(e) => {
                                                    this.removeInstruction(instruction.id)
                                                }}
                                                className="Button is-small"
                                            >X</button>

                                            <p><span>{index + 1}</span> - {instruction.text}</p>

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="NoInstruction">No instructions</p>
                            )}
                        </div>

                        <form onSubmit={this.AddInstruction}>
                            <textarea
                                rows="3"
                                required
                                ref={node => this.instructionText = node}
                                placeholder="New Instruction"
                                className="Input"
                            >
                            </textarea>
                            <button type="submit" className="Button">Add</button>
                        </form>

                    </div>
                </div>
                <div className="RecipeForm-Bottom">
                    <button 
                        type="submit" 
                        className="Button is_info"
                        onClick={this.onSubmit}
                    >Submit</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    newMessage: (message, type, time) => dispatch(newMessage(message, type, time))
});

export default connect(null, mapDispatchToProps)(RecipeForm);
