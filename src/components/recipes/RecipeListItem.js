import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserHasLiked } from '../../actions/recipes';
import LikeButton from "../layout/LikeButton";

import Button from "../layout/NavButton";
import CreatedByButtons from "../layout/CreatedByButtons";

const RecipeListItem = (props) => { 

    const { title, description, id, createdBy, timestamp, isVegetarian, ingredients, instructions, user } = props;
    
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
                        {user.loggedIn && (
                            <LikeButton id={id} hasLiked={UserHasLiked(id)} />
                        )}
                        {user.uid === createdBy && (
                            <CreatedByButtons id={id} />
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
