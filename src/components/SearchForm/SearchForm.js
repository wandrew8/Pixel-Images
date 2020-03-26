import React, { Component } from 'react';
import './SearchForm.scss';

export default class SearchForm extends Component {
    render() {
        return (
            <div class="searchbar">
                <div class="closeBar"><i class="far fa-times-circle"></i></div>
                <form id="searchForm">
                    <input required type="text" name="search" id="searchTags" />
                    <button id="submitSearch" type="submit">
                    <i class="fas fa-search"></i> Search
                    </button>
                </form>
            </div>
        )
    }
}
