import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RequireAuthentication from "../components/test";
import Messages from "../components/Messages";

import Header from "../components/Header";
import DashboardPage from "../components/DashboardPage";
import NewRecepiePage from "../components/NewRecepiePage";
import EditRecepiePage from "../components/EditRecepiePage";
import LoginPage from "../components/LoginPage";

const newRecipe = RequireAuthentication(NewRecepiePage);
const editRecipe = RequireAuthentication(EditRecepiePage, "");

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