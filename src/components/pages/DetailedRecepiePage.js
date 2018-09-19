import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { database } from "../../firebase/Firebase";

class DetailedRecepiePage extends React.Component {

    state = {
        id: this.props.location.pathname.split("/")[2] || "",
        ingredients: [],
        readyOne: false,
        readyTwo: false,
        error: false
    }

    componentWillMount() {
        database.ref(`recipes/${this.state.id}`).once("value")
            .then((snapshot) => {
                if(snapshot.val() != null){
                    this.setState(() => ({
                        title: snapshot.val().title,
                        description: snapshot.val().description,
                        time: new Date(snapshot.val().timestamp),
                        isVegetarian: snapshot.val().isVegetarian,
                        readyOne: true
                    }));
                } else {
                    this.setState(() => ({
                        error: true
                    }))
                }
            })
        database.ref(`ingredients/${this.state.id}`).once("value")
            .then((snapshot) => {
                if (snapshot.val() != null) {
                    this.setState(() => ({
                        ingredients: snapshot.val(),
                        readyTwo: true
                    }));
                } else {
                    this.setState(() => ({
                        error: true
                    }))
                }
            })
    }

    render() {
        return(
            (this.state.readyOne && this.state.readyTwo) ? (
                <div className="wrapper">
                    <div className="RecipeDetails-top">
                        <h2>{this.state.title}</h2>
                    </div>
                    <div className="RecipeDetails-left">
                        <p>{`${this.state.time.getDate()}/${this.state.time.getMonth()} - ${this.state.time.getFullYear()} ${this.state.time.getHours()}:${this.state.time.getMinutes()}`}</p>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="RecipeDetails-right">
                        <div>
                            <h3>Ingredients</h3>
                            <ul>
                                {this.state.ingredients.map((ingredient) => (
                                    <li key={ingredient.uid}>
                                        {`${ingredient.amount}${ingredient.measure} ${ingredient.text}`}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            ) : (
                !this.state.error ? <h2>Loading..</h2> : <h2>Opps Someting went wrong</h2> 
            )
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(DetailedRecepiePage));
