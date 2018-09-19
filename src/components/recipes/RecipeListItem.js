import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseRemoveRecipe } from '../../actions/recipes';

import Button from "../layout/NavButton";

const RecipeListItem = (props) => { 

    const { title, description, id, createdBy, timestamp, isVegetarian, ingredients, removeRecipe, user } = props;
    
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
                    <Button url={`/recipe/${id}`} addClass="is_info">See More</Button>
                </div>

            </div>
        </div>
    )
};

// access current redux state
const mapStateToProps = (state) => ({
    user: state.user
});

// access redux actions to modify state
const mapDispatchToProps = (dispatch) => ({
    removeRecipe: (id) => dispatch(firebaseRemoveRecipe(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);

// tar emot data för att skriva ut info om receptet