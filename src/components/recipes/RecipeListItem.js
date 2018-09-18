import React from "react";
import Button from "../layout/NavButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseRemoveRecipe } from '../../actions/recipes';

const RecipeListItem = ({ title, description, id, createdBy, timestamp, isVegetarian, ingredients, removeRecipe, user}) => { 
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
                                <Button className="Button" url={`/edit/${id}`}>Edit</Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="RecipeListItem-Content">
                    <p>{description}</p>
                </div>
                <div className="RecipeListItem-ModifyBtns">
                    <div>
                        {isVegetarian && <label className="LabelButton">Vegetarian</label>}
                        {ingredients > 0 && 
                            <label className="LabelButton">
                                {ingredients} {ingredients > 1 ? "Ingredients" : "Ingredient"}
                            </label>
                        }
                    </div>
                    <Button url={`/post/${id}`} addClass="is_info">See More</Button>
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