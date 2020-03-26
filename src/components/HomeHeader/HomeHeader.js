import React, { Component } from 'react';
import './HomeHeader.scss';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };
    }
    showModal = () => {
        this.setState({ show: true });
      }
      
      hideModal = () => {
        this.setState({ show: false });
      }
    render() {
        return (
            <div>
                <header>
                    <a href="/"><h1>Search Stock Photos</h1></a>
                    <div className="tools">
                        <div onClick={this.showModal} className="searchButton"><i className="fas fa-search"></i></div>
                        <div onClick={this.showModal} className="formButton"><i className="far fa-images"></i></div>
                    </div>
                </header>
                <Modal show={this.state.show} handleClose={this.hideModal} />
            </div>
        )
    }
}

const Modal = ({ handleClose, show }) => {
    const showHideClassName = show ? 'searchbar' : 'searchbar hidden';
  
    return (
      <div className={showHideClassName}>
        <div onClick={handleClose} className="closeBar"><i className="far fa-times-circle"></i></div>
        <form id="searchForm">
            <input required type="text" name="search" id="searchTags" />
            <button id="submitSearch" type="submit">
            <i className="fas fa-search"></i> Search
            </button>
        </form>
      </div>
    );
}; 

  