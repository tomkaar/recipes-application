import React from 'react';

import { AddRecipeToFirebase } from "../firebase/recipes";

import RecipeForm from "../components/recipes/RecipeForm";
import PageHeader from "../components/layout/PageHeader";

const NewRecepiePage = (props) => {
    const onSubmit = (recipe) => {
        AddRecipeToFirebase(recipe)
            .then((res) => res && props.history.push('/') )
    };

    return (
        <div>
            <PageHeader title="Submit a Recipe" />
            <RecipeForm onSubmit={onSubmit} />
        </div>
    );
};

export default NewRecepiePage
