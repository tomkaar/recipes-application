import React from "react";
import { connect } from 'react-redux';
import { setTextFilter, setIsVegetarianFilter, sortByLatest, sortByOldest } from '../actions/filters';

class RecipeListFilters extends React.Component {

    state = {
        textField: this.props.filters.text || ""
    }

    handleTextChange = (e) => {
        this.setState(() => ({ textField: this.textField.value }))
    }
    handleTextSubmit = (e) => {
        this.props.setTextFilter(this.textField.value);
    }
    handleSortByChange = (e) => {
        if (e.target.value === 'latest') {
            this.props.sortByLatest();
        } else if (e.target.value === 'oldest') {
            this.props.sortByOldest();
        }
    }
    handleIsVegitarianChange = (e) => {
        this.props.setIsVegetarianFilter(e.target.value);
    }

    render() {
        return(
            <div className="RecipeListFilters">
                <div className="wrapper">
                    <div className="RecipeListFilters-section">
                        <span>Search:</span>
                        <input
                            type="search"
                            value={this.state.textField}
                            onChange={this.handleTextChange}
                            ref={node => this.textField = node}
                            placeholder="Search"
                            autoFocus={true}
                            className="Filters-Text-Input"
                        />
                        <input
                            type="button"
                            name="submit"
                            value="Search"
                            className="Button is_info"
                            onClick={this.handleTextSubmit}
                        />
                    </div>
                    <div className="RecipeListFilters-section">
                        <span>Filters:</span>
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
                                onChange={this.handleIsVegitarianChange}
                            /> All Recipes
                    </label>
                        <label>
                            <input
                                type="radio"
                                value={"true"}
                                checked={this.props.filters.isVegetarian === "true"}
                                onChange={this.handleIsVegitarianChange}
                            /> Vegetarian
                    </label>
                        <label>
                            <input
                                type="radio"
                                value={"false"}
                                checked={this.props.filters.isVegetarian === "false"}
                                onChange={this.handleIsVegitarianChange}
                            /> Not Vegetarian
                    </label>
                    </div>
                </div>
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
