import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseRemoveRecipe } from '../../actions/recipes';

const RecipeListItem = ({ title, description, id, createdBy, timestamp, removeRecipe, user}) => { 
    const handleRemove = () => removeRecipe(id);

    const time = new Date(timestamp);

    return (
        <div className="RecipeListItem">
            <div className="RecipeListItem-Wrapper">
                <div className="RecipeListItem-Header">
                    <div className="RecipeListItem-Info">
                        <Link to={`/recipe/${id}`}>{title}</Link>
                        <p>{`${time.getDate()}/${time.getMonth()} - ${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`}</p>
                    </div>
                    
                    <div className="RecipeListItem-Buttons">
                        {user.uid === createdBy && (
                            <div>
                                <button className="Button" onClick={handleRemove}>Remove</button>
                                <Link className="Button" to={`/edit/${id}`}>Edit</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="RecipeListItem-Content">
                    <p>{description}</p>
                </div>
            </div>
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