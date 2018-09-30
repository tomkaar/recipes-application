import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import { Logout } from '../../firebase/auth';

import Button from "./NavButton";

class Header extends React.Component {

    state = {
        active: false
    }

    handleLogout = () => { Logout(); }
    handleLoginNavigationButton = () => {
        console.log("OK");
    };

    toggleActive = () => {
        this.setState((prevState) => ({
            active: !prevState.active
        }))
    }

    render() {
        return (
            <nav className="navigation">
                <div className="wrapper">
                    <div className="navigation__left">
                        <NavLink to="/" className="navbar-brand navbar-item l-margin-right">
                            <h1>Recipes</h1>
                        </NavLink>
                    </div>
                    <div className={`navbar-menu-wrapper ${this.state.active ? "active" : ""}`}>
                        <div className="navbar-menu">
                            <NavLink exact activeClassName="active" className="navbar-item" to="/">Home</NavLink>
                            <NavLink exact activeClassName="active" className="navbar-item" to="/search">Search</NavLink>
                            {this.props.user.user && <NavLink activeClassName="active" className="navbar-item" to="/new">New</NavLink>}
                        </div>
                        <div className="navbar-auth">
                            {this.props.user.user ?
                                <button onClick={this.handleLogout} className="Button navbar-button">Logout</button> :
                                <Button url="/login">Login or Register</Button>
                            }
                        </div>
                    </div>
                    <button className={`navbar-menu-button ${this.state.active ? "active" : ""}`} onClick={this.toggleActive}>
                        <span></span> <span></span> <span></span>
                    </button>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Header);
