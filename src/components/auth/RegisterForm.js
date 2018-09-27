import React from "react";
import { withRouter } from "react-router-dom";
import { RegisterWithEmail } from '../../firebase/auth';

class RegisterForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const register = await RegisterWithEmail(this.state.email, this.state.password);
        (register === true) && this.props.history.push("/");
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

export default withRouter(RegisterForm);
