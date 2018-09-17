import React from "react";

class RecipeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.id ? props.id : "",
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            isVegetarian: props.isVegetarian ? props.isVegetarian : false,
            ingredients: props.ingredients ? props.ingredients : [],
            uid: props.ingredients ? props.ingredients.length : 0
        }
    }

    componentWillReceiveProps(props) {
        this.setState(() => ({
            id: props.recipeData.id ? props.recipeData.id : "",
            title: props.recipeData.title ? props.recipeData.title : "",
            description: props.recipeData.description ? props.recipeData.description : "",
            isVegetarian: props.recipeData.isVegetarian ? props.recipeData.isVegetarian : false,
            ingredients: props.recipeData.ingredients ? props.recipeData.ingredients : [],
            uid: props.recipeData.ingredients ? props.recipeData.ingredients.length : 0,
        }));
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
            <div>
                <form onSubmit={this.onSubmit}>
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



                {this.state.ingredients.length !== 0 ? (
                    <div>
                        {this.state.ingredients.map(ingredient => (
                            <div key={ingredient.uid}>
                                {ingredient.amount}{ingredient.measure} {ingredient.text}
                                <button onClick={(e) => { this.removeIngredient(ingredient.uid) }}>X</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Ingredients</div>
                )}

                <div>
                    <form onSubmit={this.AddIngredient}>
                        <input type="number" placeholder="amount" required ref={node => this.ingredientAmount = node} />
                        <input type="text" placeholder="Mesure" required ref={node => this.ingredientMeasure = node} />
                        <input type="text" placeholder="Ingredient" required ref={node => this.ingredientText = node} />
                        <button type="submit">Add</button>
                    </form>
                </div>



            </div>
        )
    }
}

export default RecipeForm;