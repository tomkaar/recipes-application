import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "../../firebase/firebase";
import { userLogin, userLogout } from '../../actions/auth';
import { newMessage, removeMessage } from '../../actions/messages';

class LoginForm extends React.Component {

    state = {
        email: "",
        password: ""
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
                this.props.history.push('/');
            })
            .catch(error => {
                this.props.removeMessage(attemptMessage.payload.id);
                this.props.newMessage(error.message, "Error", 5000);
            })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleLoginSubmission}>
                    <label className="Label">
                        Email:
                            <input
                            type="text"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            autoComplete="email"
                            autoFocus={true}
                            className="Input"
                        />
                    </label>
                    <label className="Label">
                        Password:
                            <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            autoComplete="password"
                            className="Input"
                        />
                    </label>
                    <button className="Button is_info l-margin-top">Sign In</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
