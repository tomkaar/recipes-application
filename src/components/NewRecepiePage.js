import React from 'react';

class NewRecepiePage extends React.Component {

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

    render() {
        return(
            <div>
                <h1>New recpie Page</h1>
            </div>
        )
    }
};

export default NewRecepiePage;