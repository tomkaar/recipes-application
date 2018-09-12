import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import LoginRegister from "./LoginRegister";

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.user.user ? (
                <WrappedComponent {...props} />
            ) : (
                <div>
                    <h2>You need to be logged in to view this page</h2>
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