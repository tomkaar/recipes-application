import React from "react";
import { withRouter } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { SignUpWithGoogle } from "../../actions/auth";

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
    handleGoogleSignIn = async () => {
        const googleLoginRegister = await SignUpWithGoogle();
        (googleLoginRegister === true) && this.props.history.push("/");
    }

    render() {
        return(
            <div className="LoginRegister">
                <h2 className="LoginRegister__title">{this.state.visible === "login" ? "Sign In" : "Register"}</h2>
                <div className="LoginRegister__Buttons">
                    <button className={this.state.visible === "login" ? "isActive" : ""} onClick={this.handleClickToDisplayLogin}>Sign In</button>
                    <button className={this.state.visible === "register" ? "isActive" : ""} onClick={this.handleClickToDisplayRegister}>Register</button>
                </div>
                <div className="LoginRegister__Content">
                    {this.state.visible === "login" && <LoginForm />}
                    {this.state.visible === "register" && <RegisterForm />}
                </div>
                <div className="OtherSignInMethods">
                    <div className="OtherSignInMethods-Google">
                        <button onClick={this.handleGoogleSignIn}>Google</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(LoginRegister);
