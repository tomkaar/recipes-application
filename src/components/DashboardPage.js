import React from 'react';
import RecipeListFilters from "./RecipeListFilters";
import RecipeList from "./RecipeList";

const DashboardPage = () => (
    <div className="DashboardPage">
        <h1>Dashboard Page</h1>
        <RecipeListFilters />
        <RecipeList />
    </div>
);

export default DashboardPage;