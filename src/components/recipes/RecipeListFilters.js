import React from "react";
import { connect } from 'react-redux';
import { setTextFilter, setIsVegetarianFilter, sortByLatest, sortByOldest } from '../../actions/filters';

const RecipeListFilters = (props) => {
    
    const handleTextSubmitTwo = (e) => {
        props.setTextFilter(e.target.value);
    }

    const handleSortByChange = (e) => {
        if (e.target.value === 'latest') {
            props.sortByLatest();
        } else if (e.target.value === 'oldest') {
            props.sortByOldest();
        }
    }

    const handleIsVegitarianChange = (e) => {
        props.setIsVegetarianFilter(e.target.value);
    }

    return(
        <div className="RecipeListFilters">
            <div className="wrapper">
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
                        onChange={handleSortByChange}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div className="RecipeListFilters-section">
                    <label>
                        <input
                            type="radio"
                            value="all"
                            checked={props.filters.isVegetarian === "all"}
                            onChange={handleIsVegitarianChange}
                        /> All Recipes
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={"true"}
                            checked={props.filters.isVegetarian === "true"}
                            onChange={handleIsVegitarianChange}
                        /> Vegetarian
                </label>
                    <label>
                        <input
                            type="radio"
                            value={"false"}
                            checked={props.filters.isVegetarian === "false"}
                            onChange={handleIsVegitarianChange}
                        /> Not Vegetarian
                </label>
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
