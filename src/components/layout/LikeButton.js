import React from "react";
import UnLikeImg from "../../img/unliked.png";
import LikeImg from "../../img/liked.png";

function LikeButton(props) {
    return (
        props.hasLiked ? (
            <button className="LikeButton" onClick={props.handleRemoveLike}>
                <img src={LikeImg} alt="Unlike"/>
            </button>
        ) : (
            <button className="LikeButton" onClick={props.handleAddLike}>
                <img src={UnLikeImg} alt="Like"/>
            </button>
        )
    )
}

export default LikeButton;
