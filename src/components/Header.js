import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { firebase } from "../firebase/Firebase";
import { userLogin, userLogout } from '../actions/user';

class Header extends React.Component {
    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.userLogout();
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <nav className="navigation">
                <div className="navigation__left">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    {this.props.user.user && <NavLink activeClassName="active" to="/new">New</NavLink>}
                    {this.props.user.user && <NavLink activeClassName="active" to="/edit">Edit</NavLink>}
                </div>
                <div className="navigation__right">
                    {this.props.user.user ?
                        <button onClick={this.handleLogout}>Logout</button> :
                        <NavLink activeClassName="active" to="/login">Login</NavLink>
                    }
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
    userLogout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// only show NavLink New and Edit if user is logged in
// instad of using a <a> we can use Link or NavLink which is a extension of Link to navigation on our page.
