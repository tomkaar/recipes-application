import React from "react";
import { connect } from 'react-redux';
import { setTextFilter, setIsVegetarianFilter, sortByLatest, sortByOldest } from '../actions/filters';

class RecipeListFilters extends React.Component {

    handleTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    handleIsVegitarianChange = (e) => {
        this.props.setIsVegetarianFilter(e.target.checked);
    }
    handleSortByChange = (e) => {
        if (e.target.value === 'latest') {
            this.props.sortByLatest();
        } else if (e.target.value === 'oldest') {
            this.props.sortByOldest();
        }
    }

    handleIsVegitarianChangeTwo = (e) => {
        this.props.setIsVegetarianFilter(e.target.value);
    }

    render() {
        return(
            <div className="Filters">
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.handleTextChange}
                    placeholder="Search"
                    className="Filters-Text-Input"
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.handleSortByChange}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <label>
                    <input 
                        type="radio" 
                        value="all" 
                        checked={this.props.filters.isVegetarian === "all"} 
                        onChange={this.handleIsVegitarianChangeTwo}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        value={"true"}
                        checked={this.props.filters.isVegetarian === "true"}
                        onChange={this.handleIsVegitarianChangeTwo}
                    />
                    Vegetarian
                </label>
                <label>
                    <input
                        type="radio"
                        value={"false"}
                        checked={this.props.filters.isVegetarian === "false"}
                        onChange={this.handleIsVegitarianChangeTwo}
                    />
                    Not Vegetarian
                </label>
            </div>
        )
    }
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
