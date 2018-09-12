import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";

import { userLogin, userLogout } from "./actions/user";
import AppRouter from "./routers/AppRouter";

class App extends React.Component {

    componentDidMount() {
        firebase.auth()
            .onAuthStateChanged((user) => {
                user ? this.props.userLogin(user) : this.props.userLogout();
            });
    }

    render() {
        return <AppRouter />;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({
    userLogin: (user) => dispatch(userLogin(user)),
    userLogout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// when the App was mounted, check if user is logged in and update redux state
// use connect to access to the Redux State
