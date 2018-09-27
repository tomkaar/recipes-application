import React from "react";

export default (props) => (
    <label className="Checkbox" style={{"color": props.color}} >
        {props.text}
        <input type="radio" name="radio" 
            checked={props.checked}
            onChange={props.onChange}
            value={props.value} />
        <span className="checkmark"></span>
    </label>
);