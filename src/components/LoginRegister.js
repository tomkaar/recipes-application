import React from "react";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

class LoginRegister extends React.Component {

    state = {
        visible: "login"
    }

    handleClickToDisplayLogin = () => {
        this.setState(() => ({ visible: "login" }));
    }
    handleClickToDisplayRegister = () => {
        this.setState(() => ({ visible: "register" }));
    }

    render() {
        return(
            <div className="login">
                <h2>{this.state.visible === "login" ? "Login" : "Register"}</h2>
                <div>
                    <button onClick={this.handleClickToDisplayLogin}>Login</button>
                    <button onClick={this.handleClickToDisplayRegister}>Register</button>
                </div>
                {this.state.visible === "login" && <LoginForm /> }
                {this.state.visible === "register" && <RegisterForm /> }
            </div>
        );
    }
}

export default LoginRegister;