import React from "react";

class RecipeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.id ? props.id : "",
            title: props.title ? props.title : "",
            description: props.description ? props.description : "",
            isVegetarian: props.isVegetarian ? props.isVegetarian : false
        }
    }

    componentWillReceiveProps(props) {
        this.setState(() => ({
            id: props.recipeData.id,
            title: props.recipeData.title,
            description: props.recipeData.description,
            isVegetarian: props.recipeData.isVegetarian,
        }));
    }
    
    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
    handleIsVegitarianChange = e => this.setState({ isVegetarian: e.target.checked});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            title: this.state.title,
            description: this.state.description,
            isVegetarian: this.state.isVegetarian
        });
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
            </div>
        )
    }
}

export default RecipeForm;