import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RemoveRecipeFromFirebase, AddLikeToFirebase, RemoveLikeFromFirebase } from '../../actions/recipes';
import { UserHasLiked } from '../../actions/recipes';

import Button from "../layout/NavButton";

const RecipeListItem = (props) => { 

    const { title, description, id, createdBy, timestamp, isVegetarian, ingredients, instructions, user } = props;
    
    const handleRemove = () => RemoveRecipeFromFirebase(id);
    const handleAddLike = () =>  AddLikeToFirebase(id);
    const handleRemoveLike = () => RemoveLikeFromFirebase(id);
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
                        {user.uid !== undefined && (
                            UserHasLiked(id) ? (
                                <button className="Button" onClick={handleRemoveLike}>UnLike</button>
                            ) : (
                                <button className="Button" onClick={handleAddLike}>Like</button>
                            )
                        )}
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
                    <div className="RecipeListItem-ModifyBtns-labels">
                        {isVegetarian && <label className="LabelButton">Vegetarian</label>}
                        {ingredients > 0 && 
                            <label className="LabelButton">
                                {ingredients} {ingredients > 1 ? "Ingredients" : "Ingredient"}
                            </label>
                        }
                        {instructions > 0 &&
                            <label className="LabelButton">
                                {instructions} {instructions > 1 ? "Steps" : "Step"}
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

export default connect(mapStateToProps)(RecipeListItem);
