import React from "react";

class RecipeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.recipeData ? props.recipeData.id : "",
            title: props.recipeData ? props.recipeData.title : "",
            description: props.recipeData ? props.recipeData.description : "",
            isVegetarian: props.recipeData ? props.recipeData.isVegetarian : false,
            ingredients: props.recipeData ? props.recipeData.ingredients : [],
            uid: props.recipeData ? props.recipeData.ingredients.length : [],
        }
    }
    
    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
    handleIsVegitarianChange = e => this.setState({ isVegetarian: e.target.checked});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            title: this.state.title,
            description: this.state.description,
            isVegetarian: this.state.isVegetarian,
            ingredients: this.state.ingredients
        });
    }

    AddIngredient = (e) => {
        e.preventDefault()
        const uid = this.state.uid + 1;
        this.setState(() => ({ uid }))
        const newIngredient = {
            uid: uid,
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
        const removed = this.state.ingredients.filter((i) => i.uid !== id);
        this.setState(() => ({ ingredients: removed }))
    }

    render() {
        return(
            <div className="RecipeForm">
                <form onSubmit={this.onSubmit} className="RecipeForm-meta">
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
                    <label className="Label">
                        <input
                            type="checkbox"
                            checked={this.state.isVegetarian}
                            onChange={this.handleIsVegitarianChange}
                        /> Is Vegetarian
                    </label>
                    <button type="submit" className="Button is_info">Submit</button>
                </form>

                <div className="RecipeForm-ingredients">
                    {this.state.ingredients.length !== undefined ? (
                        <div>
                            <h3>Ingredients</h3>
                            {this.state.ingredients.map(ingredient => (
                                <div className="RecipeForm-ingredients__item" key={ingredient.uid}>
                                    <button
                                        onClick={(e) => { this.removeIngredient(ingredient.uid) }}
                                        className="Button"
                                    >X</button>
                                    {ingredient.amount}{ingredient.measure} {ingredient.text}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No Ingredients</div>
                    )}

                    <form onSubmit={this.AddIngredient}>
                        <input 
                            type="number" 
                            placeholder="amount" 
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
                        <button type="submit" className="Button is_info RecipeForm-ingredients__Button">Add</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default RecipeForm;