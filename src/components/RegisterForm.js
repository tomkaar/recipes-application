import React from "react";
import { firebase } from "../firebase/Firebase";

class RegisterForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    handleSubmit = e => {
        e.preventDefault();
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(console.log("Created User!"))
            .catch(error => console.log(error));
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="form">
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
                    <button type="submit" className="is_info">Register</button>
                </form>
            </div>
        )
    }
}

export default RegisterForm;