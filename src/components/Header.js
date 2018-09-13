import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { firebase } from "../firebase/Firebase";
import { userLogin, userLogout } from '../actions/user';
import { newMessage } from '../actions/messages';

class Header extends React.Component {
    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.userLogout();
                this.props.newMessage("You have successfully been logged out", "Success", 3000);
            })
            .catch(error => {
                this.props.newMessage(error.message, "Danger");
            });
    }

    render() {
        return (
            <nav className="navigation">
                <div className="navigation__left">
                    <div className="navbar-brand">
                        <h1>Recipes</h1>
                    </div>
                    <div className="navbar-menu">
                        <NavLink exact activeClassName="active" className="navbar-item" to="/">Home</NavLink>
                        {this.props.user.user && <NavLink activeClassName="active" className="navbar-item" to="/new">New</NavLink>}
                        {this.props.user.user && <NavLink activeClassName="active" className="navbar-item" to="/edit">Edit</NavLink>}
                    </div>
                </div>
                <div className="navigation__right">
                    <div className="navbar-menu">
                        {this.props.user.user ?
                            <button onClick={this.handleLogout} className="Button navbar-button">Logout</button> :
                            <NavLink to="/login" className="navbar-item l-margin-right">Login</NavLink>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({
    userLogin: (user) => dispatch(userLogin(user)),
    userLogout: () => dispatch(userLogout()),
    newMessage: (message, type, time) => dispatch(newMessage(message, type, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// only show NavLink New and Edit if user is logged in
// instad of using a <a> we can use Link or NavLink which is a extension of Link to navigation on our page.
