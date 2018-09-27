import React from "react";
import Button from "./NavButton";
import { RemoveRecipeFromFirebase } from '../../firebase/recipes';

const CreatedByButtons = (props) => {

    const handleRemove = () => RemoveRecipeFromFirebase(props.id);

    return (
        <React.Fragment>
            <button className="Button" onClick={handleRemove}>Remove</button>
            <Button className="Button" url={`/edit/${props.id}`}>Edit</Button>
        </React.Fragment>
    )
}

export default CreatedByButtons;
