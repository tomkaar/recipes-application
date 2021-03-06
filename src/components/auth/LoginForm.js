import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin, userLogout } from '../../actions/auth';
import { LoginWithEmail } from '../../firebase/auth';
import { newMessage, removeMessage } from '../../actions/messages';

class LoginForm extends React.Component {

    state = {
        email: "",
        password: ""
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

    handleLoginSubmission = async (e) => {
        e.preventDefault();
        let login = await LoginWithEmail(this.state.email, this.state.password);
        (login === true) && this.props.history.push("/");
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
