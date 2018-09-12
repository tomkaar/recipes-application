import React from 'react';
import Filters from "./Filters";

class DashboardPage extends React.Component {

    state = {
        recepies: {
            "one": {
                title: "Chicken",
                "description": "This is the description",
                createdBy: "me",
                timestamp: 1000,
                dish: true,
                pastry: false,
                isVegetarian: false
            },
            "two": {
                title: "Chicken",
                "description": "This is the description",
                createdBy: "me",
                timestamp: 1000,
                dish: true,
                pastry: false,
                isVegetarian: false
            }
        }
    }

    componentDidMount() {
        // get filters
        // get recepies from state
        // push recepies to state
        // render recepies 
    }

    handleOnClick = () => {
        // console.log(newMessage("this is the message", "danger"));
    }

    render() {
        return(
            <div>
                <h1>Dashboard Page</h1>
                <Filters />
                <p>List of all recepies</p>
            </div>
        )
    }
};

export default DashboardPage;