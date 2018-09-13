import React from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import LoginRegister from "./LoginRegister";

const requireAuthentication = (WrappedComponent, RedirectURL = undefined) => {
    return (props) => (
        <div className="requireAuthentication">
            {props.user.user ? (
                <WrappedComponent {...props} />
            ) : (
                <div className="requireAuthentication__message">
                    {RedirectURL !== undefined && <Redirect to={"/" + RedirectURL} />}
                        <h2 className="requireAuthentication-title">You need to be logged in to view this page</h2>
                        <p className="requireAuthentication-paragraph">Create an Account or Sign In</p>
                    <LoginRegister />
                </div>
            )}
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default compose(
    connect(mapStateToProps),
    requireAuthentication
);