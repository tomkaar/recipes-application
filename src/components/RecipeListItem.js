import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseRemoveRecipe } from '../actions/recipes';

const RecipeListItem = ({ title, description, id, createdBy, timestamp, removeRecipe, user}) => { 
    const handleRemove = () => removeRecipe(id);

    const time = new Date(timestamp);

    return (
        <div className="RecipeListItem">
            <Link to={`/recipe/${id}`}>{title}</Link>
            { user.uid === createdBy &&  <Link to={`/edit/${id}`}> - edit</Link> }
            <p>{`${time.getDate()}/${time.getMonth()} - ${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`}</p>
            <p>{description}</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    removeRecipe: (id) => dispatch(firebaseRemoveRecipe(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);