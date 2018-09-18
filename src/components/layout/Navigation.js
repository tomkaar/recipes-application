import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import { Logout } from '../../actions/auth';

class Header extends React.Component {

    handleLogout = () => { Logout(); }

    render() {
        return (
            <nav className="navigation">
                <div className="wrapper">
                    <div className="navigation__left">
                        <NavLink to="/" className="navbar-brand navbar-item l-margin-right">
                            <h1>Recipes Application</h1>
                        </NavLink>
                        <div className="navbar-menu">
                            <NavLink exact activeClassName="active" className="navbar-item" to="/">Home</NavLink>
                            <NavLink exact activeClassName="active" className="navbar-item" to="/search">Search</NavLink>
                            {this.props.user.user && <NavLink activeClassName="active" className="navbar-item" to="/new">New</NavLink>}
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
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(Header);
