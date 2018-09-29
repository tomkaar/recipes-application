import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import RequireAuthentication from "../components/auth/RequireAuthentication";

import Messages from "../components/messages/Messages";
import Navigation from "../components/layout/Navigation";

import DashboardPage from "../pages/DashboardPage";
import NewRecepiePage from "../pages/NewRecepiePage";
import EditRecepiePage from "../pages/EditRecepiePage";
import LoginPage from "../pages/LoginPage";
import DetailedRecepiePage from "../pages/DetailedRecepiePage";
import SearchRecipePage from "../pages/SearchRecipePage";

const newRecipe = RequireAuthentication(NewRecepiePage, "");
const editRecipe = RequireAuthentication(EditRecepiePage, "");

const AppRouter = (props) => (
    <Router basename={props.path}>
        <div>
            <Navigation />
            <div className="PageMarginTop">
                <Route exact path="/" component={DashboardPage} />
                <Route path="/new" component={newRecipe} />
                <Route path="/search" component={SearchRecipePage} />
                <Route path="/edit/:id" component={editRecipe} />
                <Route path="/recipe/:id" render={DetailedRecepiePage} />
                <Route path="/login" component={LoginPage} />
            </div>
            <Messages />
        </div>
    </Router>
);

export default AppRouter;
