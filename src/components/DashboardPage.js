import React from 'react';
import RecipeListFilters from "./RecipeListFilters";
import RecipeList from "./RecipeList";
import PageHeader from "./PageHeader";

const DashboardPage = () => (
    <div className="DashboardPage">
        <PageHeader title="Find Recipes" para="Find what you are looking for"/>
        <RecipeListFilters />
        <RecipeList />
    </div>
);

export default DashboardPage;