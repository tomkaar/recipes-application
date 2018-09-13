import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseRemoveRecipe } from '../actions/recipes';

const RecipeListItem = ({ title, description, id, createdBy, timestamp, removeRecipe}) => { 
    const handleRemove = (e) => {
        console.log("REMOVE");
        removeRecipe(id);
    }
    return (
    <div className="RecipeListItem">
        <Link to={`/recipe/${id}`}>{title}</Link>
        <p>{description}</p>
        <button onClick={handleRemove}>Remove</button>
    </div>
)};

const mapDispatchToProps = (dispatch) => ({
    removeRecipe: (id) => dispatch(firebaseRemoveRecipe(id))
});

export default connect(undefined, mapDispatchToProps)(RecipeListItem);