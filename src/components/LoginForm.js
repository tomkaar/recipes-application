import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../firebase/Firebase";
import { userLogin, userLogout } from '../actions/user';
import { newMessage, removeMessage } from '../actions/messages';

class LoginForm extends React.Component {

    state = {
        email: "",
        password: "",
        toDashboard: false,
    }

    componentDidMount() { this.setState(() => ({ toDashboard: false })); }
    componentDidUnMount() { this.setState(() => ({ toDashboard: false })); }
    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

    handleLoginSubmission = (e) => {
        e.preventDefault();
        const attemptMessage = this.props.newMessage("Attempting to login", "Info");
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((snapshot) => {
                this.props.userLogin(snapshot.user);
                this.props.removeMessage(attemptMessage.payload.id);
                this.props.newMessage("You have successfully logged in", "Success", 3000);
                this.setState(() => ({ toDashboard: true }));
            })
            .catch(error => {
                this.props.removeMessage(attemptMessage.payload.id);
                this.props.newMessage(error.message, "Error", 5000);
            })
    }

    render() {
        return(
            <div>
                {this.state.toDashboard === true && <Redirect to='/' /> }
                <form onSubmit={this.handleLoginSubmission}>
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
    userLogout: () => dispatch(userLogout()),
    newMessage: (message, type, time) => dispatch(newMessage(message, type, time)),
    removeMessage: (id) => dispatch(removeMessage(id))
});

// cannot use functional components when using connect
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
