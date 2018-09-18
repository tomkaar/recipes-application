import React from "react";
import { withRouter } from "react-router-dom";

const NavButton = (props) => {
    const handleClick = () => {
        props.history.push(props.url);
    }
    return (
        <button onClick={handleClick} className={`Button navbar-button ${props.addClass}`}>{props.children}</button>
    )
}

export default withRouter(NavButton);