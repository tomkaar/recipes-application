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
    toggleActive = () => {
        this.setState((prevState) => ({
            active: !prevState.active
        }))
    }
    closeActive = () => {
        this.setState(() => ({
            active: false
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
                            <NavLink exact activeClassName="active" className="navbar-item" to="/" onClick={this.closeActive}>Home</NavLink>
                            <NavLink exact activeClassName="active" className="navbar-item" to="/search" onClick={this.closeActive}>Search</NavLink>
                            {this.props.user.user && <NavLink activeClassName="active" className="navbar-item" to="/new" onClick={this.closeActive}>New</NavLink>}
                        </div>
                        <div className="navbar-auth">
                            {this.props.user.user ?
                                <button onClick={this.handleLogout} className="Button navbar-button">Logout</button> :
                                <Button url="/login" onClick={this.closeActive}>Login or Register</Button>
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
