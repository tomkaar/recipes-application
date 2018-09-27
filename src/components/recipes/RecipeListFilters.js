import React from "react";
import { connect } from 'react-redux';
import { setTextFilter, setIsVegetarianFilter, sortByLatest, sortByOldest } from '../../actions/filters';
import Checkbox from '../layout/Checkbox';

const RecipeListFilters = (props) => {
    
    const handleTextSubmitTwo = (e) => {
        props.setTextFilter(e.target.value);
    }

    const handleSortByChange = (e) => {
        e.target.value === "latest" ? props.sortByLatest() : props.sortByOldest();
    }

    const handleIsVegitarianChange = (e) => {
        props.setIsVegetarianFilter(e.target.value);
    }

    return(
        <div className="RecipeListFilters">
            <div className="wrapper">
                <h2>Search</h2>
                <div className="RecipeListFilters-section">
                    <input
                        type="search"
                        value={props.filters.text}
                        onChange={handleTextSubmitTwo}
                        ref={node => this.textField = node}
                        placeholder="Search"
                        autoFocus={true}
                        className="Filters-Text-Input"
                    />
                    <select
                        value={props.filters.sortBy}
                        onChange={handleSortByChange} >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div className="RecipeListFilters-section">
                    <Checkbox 
                        text="All Recipes"
                        value={"all"}
                        checked={props.filters.isVegetarian === "all"}
                        onChange={handleIsVegitarianChange} 
                        color="white"
                    />
                    <Checkbox 
                        text="Vegetarian"
                        value={"true"}
                        checked={props.filters.isVegetarian === "true"}
                        onChange={handleIsVegitarianChange} 
                        color="white"
                    />
                    <Checkbox 
                        text="Not Vegetarian"
                        value={"false"}
                        checked={props.filters.isVegetarian === "false"}
                        onChange={handleIsVegitarianChange} 
                        color="white"
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setIsVegetarianFilter: (isVegetarian) => dispatch(setIsVegetarianFilter(isVegetarian)),
    sortByLatest: () => dispatch(sortByLatest()),
    sortByOldest: () => dispatch(sortByOldest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListFilters);
