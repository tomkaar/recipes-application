import React from 'react';

import { database } from "../../firebase/Firebase";
import RecipeList from "../recipes/RecipeList";
import PageHeader from "../layout/PageHeader";

class DashboardPage extends React.Component {
    state = {
        ref: "",
        recipes: []
    }

    componentDidMount() {
        const ref = database.ref("recipes");
        this.setState(() => ({ ref }));

        ref.limitToLast(10)
            .orderByChild("timestamp")
            .on("child_added", (snapshot) => {
                const data = { ...snapshot.val(), id: snapshot.key }
                // add function
            }).bind(this);

        ref.on("child_removed", snapshot => {
            const data = snapshot.key;
            // remove function
        })

        ref.on("child_changed", snapshot => {
            const data = { ...snapshot.val(), id: snapshot.key };
            // edit function
        })
    }

    componentWillUnmount() {
        this.state.ref.off();
    }

    render() {
        return (
            <div className="DashboardPage">
                <PageHeader title="Recently added" para="No Redux" />
                <RecipeList recipes={this.state.recipes} />
            </div>
        )
    }
}

export default DashboardPage;