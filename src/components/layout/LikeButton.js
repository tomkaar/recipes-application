import React from "react";
import { AddLikeToFirebase, RemoveLikeFromFirebase } from '../../firebase/likes';
import UnLikeImg from "../../img/unliked.png";
import LikeImg from "../../img/liked.png";

const LikeButton = (props) => {

    const handleRemoveLike = () => {
        RemoveLikeFromFirebase(props.id)
    };
    const handleAddLike = () => {
        AddLikeToFirebase(props.id)
    };

    return (
        props.hasLiked ? (
            <button className="LikeButton" onClick={handleRemoveLike}>
                <img src={LikeImg} alt="Unlike" />
            </button>
        ) : (
            <button className="LikeButton" onClick={handleAddLike}>
                <img src={UnLikeImg} alt="Like" />
            </button>
        )
    )
}

export default LikeButton;
