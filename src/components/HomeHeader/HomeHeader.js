import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomeHeader.scss';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            scrollPosition: 0,
        };
    }
    showModal = () => {
        this.setState({ show: true });
      }
      
      hideModal = () => {
        this.setState({ show: false });
      }

      componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
      }
      
      componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
      }
      
      listenToScroll = () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop
      
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      
        const scrolled = winScroll / height
        this.setState({
          scrollPosition: scrolled,
        })
      }
    render() {
        const styledHeader = {
            height: this.state.scrollPosition > 0.05 ? '60px' : '100px',
            opacity: this.state.scrollPosition > 0.05 ? '0.8' : '1',

        }
        return (
            <div>
                <header style={styledHeader}>
                    <Link to="/"><h1>Pixel Images</h1></Link>
                    <div className="tools">
                        <div onClick={this.showModal} className="searchButton"><i className="fas fa-search"></i>Search</div>
                        <div className="formButton"><button><a href="/signup"><i className="fas fa-user"></i>Join</a></button></div>
                    </div>
                </header>
                <Modal show={this.state.show} handleClose={this.hideModal} />
            </div>
        )
    }
}

const Modal = ({ handleClose, show }) => {
    const showHideClassName = show ? 'searchbar' : 'searchbar hideSearchBar';
  
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

  