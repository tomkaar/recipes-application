import React from 'react';
import RecipeForm from "./RecipeForm";

class NewRecepiePage extends React.Component {
    render() {
        return(
            <div>
                <h1>Add a recipe</h1>
                <RecipeForm />
            </div>
        )
    }
};

export default NewRecepiePage;

