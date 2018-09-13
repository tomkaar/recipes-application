import React from "react";
import { connect } from "react-redux";
import { firebase } from "../firebase/Firebase";
import { userLogin, userLogout } from '../actions/user';
import { newMessage, removeMessage } from '../actions/messages';

class RegisterForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    handleSubmit = e => {
        e.preventDefault();
        const attemptMessage = this.props.newMessage("Attempting to create an account", "Info");
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                console.log("Created User!");
                this.props.removeMessage(attemptMessage.payload.id);
                this.props.newMessage("You account has been successfully created", "Success", 5000);
            })
            .catch(error => {
                this.props.removeMessage(attemptMessage.payload.id);
                this.props.newMessage(error.message, "Error", 5000);
            });
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="form">
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
                    <button type="submit" className="Button is_info l-margin-top">Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
