import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../firebase/Firebase";
import { userLogin, userLogout } from '../actions/user';

class LoginForm extends React.Component {

    // keep track of currently typed
    state = {
        email: "",
        password: "",
        toDashboard: false,
    }

    componentDidMount() { this.setState(() => ({ toDashboard: false })); }
    componentDidUnMount() { this.setState(() => ({ toDashboard: false })); }

    // when you click on the login button
        // login with firebase auth and then update redux state if successfull
    handleLogin = (e) => {
        e.preventDefault();
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((snapshot) => {
                this.props.userLogin(snapshot.user);
                this.setState(() => ({toDashboard: true}));
            })
            .catch(error => console.log(error))
    }

    // update local state when typing
    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                {this.state.toDashboard === true ? <Redirect to='/' /> : "" }
                <form onSubmit={this.handleLogin}>
                    <label>
                        Email:
                            <input
                            type="text"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            autoComplete="email"
                            autoFocus={true}
                        />
                    </label>
                    <label>
                        Password:
                            <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            autoComplete="password"
                        />
                    </label>
                    <button>Login</button>
                </form>
            </div>
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

// cannot use functional components when using connect
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
