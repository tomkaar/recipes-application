import React from "react";
import Button from "./NavButton";

function CreatedByButtons(props) {
    return (
        <div>
            <button className="Button" onClick={props.handleRemove}>Remove</button>
            <Button className="Button" url={`/edit/${props.id}`}>Edit</Button>
        </div>
    )
}

export default CreatedByButtons;
