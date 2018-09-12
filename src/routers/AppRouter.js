import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import requireAuthentication from "../components/requireAuthentication";
import Messages from "../components/Messages";

import Header from "../components/Header";
import DashboardPage from "../components/DashboardPage";
import NewRecepiePage from "../components/NewRecepiePage";
import EditRecepiePage from "../components/EditRecepiePage";
import LoginPage from "../components/LoginPage";

const newRecipe = requireAuthentication(NewRecepiePage, "");
const editRecipe = requireAuthentication(EditRecepiePage, "");

const AppRouter = (props) => (
    <Router basename={props.path}>
        <div>
            <Header />
            <div className="PageMarginTop">
                <Route exact path="/" component={DashboardPage} />
                <Route path="/new" component={newRecipe} />
                <Route path="/edit" component={editRecipe} />
                <Route path="/post/:id" render={() => <h1>Edit post with ID</h1>} />
                <Route path="/login" component={LoginPage} />
                <Messages />
            </div>
        </div>
    </Router>
);

export default AppRouter;

// Added React Router DOM to make it easier to created pages. 
// It looks at the current url and renders a component depending on the url match
// Yes you should add a state that looks at the current url and renders a component based on that
// but that kind of ugly and here we have the functionality premade. 

// Header will render on every page and will not be affected by the router or current page.