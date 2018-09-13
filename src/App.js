import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import { userLogin, userLogout } from "./actions/user";
import AppRouter from "./routers/AppRouter";

import "./styles/styles.scss";

class App extends React.Component {

    state = {
        "loaded": false,
        firebase: ""
    }

    componentWillMount() {
        this.setState(() => ({
            firebase: firebase.auth()
                .onAuthStateChanged((user) => {
                    if (user) {
                        this.props.userLogin(user);
                        this.setState(() => ({ loaded: true }));
                    } else {
                        this.props.userLogout();
                        this.setState(() => ({ loaded: true }));
                    }
                })
        }))
    }

    render() {
        this.state.loaded === true && this.state.firebase();
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
