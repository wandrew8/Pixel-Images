import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserHeader.scss';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            scrollPosition: 0,
            addPhoto: false,
        };
    }
    showModal = () => {
        this.setState({ show: true });
    }
    
    hideModal = () => {
    this.setState({ show: false });
    }

    openPhotoModal = () => {
        this.setState({ addPhoto: true })
    }

    closePhotoModal = () => {
    this.setState({ addPhoto: false })
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
        console.log(this.state)
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
                    <Link to="/user"><h1>Pixel Images</h1></Link>
                    <div className="tools">
                        <div onClick={this.showModal} className="searchButton"><i className="fas fa-search"></i>Search</div>
                        <div onClick={this.openPhotoModal} className="searchButton"><i class="fas fa-camera-retro"></i></div>
                    </div>
                </header>
                <Modal show={this.state.show} handleClose={this.hideModal} />
                <AddPhotoModal show={this.state.addPhoto} handleClose={this.closePhotoModal} />
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


const AddPhotoModal = ({ handleClose, show }) => {
    const showHideClassName = show ? 'formModal' : 'formModal hideModal';

    return (
        <div className={showHideClassName}>
            <form id="addPhotoForm">
                <h2>ADD YOUR OWN PHOTO</h2>
                <div onClick={handleClose} className="closeModal"><i className="far fa-times-circle"></i></div>
               
                <div className="formGroup">
                <label htmlFor="category">Category</label>
                <select required id="category">
                    <option value="landscape">Select a category...</option>
                    <option value="landscape">Landscape</option>
                    <option value="architecture">Architecture</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="nature">Nature</option>
                    <option value="aerial">Aerial</option>
                    <option value="portrait">Portrait</option>
                    <option value="fashion">Fashion</option>
                    <option value="sports">Sports</option>
                    <option value="art">Art</option>
                </select>
                </div>
                <div className="formGroup">
                <label htmlFor="tags">Add some tags to describe your image</label>
                <div className="row">
                    <input list="tags" id="tagInput" />
                    <datalist id="tags">
                    <option value="mountain"> </option>
                    <option value="food"> </option>
                    <option value="yoga"> </option>
                    <option value="dogs"> </option>
                    <option value="sunrise"> </option>
                    <option value="travel"> </option>
                    <option value="dinner"> </option>
                    <option value="city"> </option>
                    <option value="modern"> </option>
                    <option value="blue"> </option>
                    <option value="football"> </option>
                    <option value="garden"> </option>
                    <option value="animals"> </option>
                    </datalist>
                    <button id="addTagButton"><i className="fas fa-plus"></i></button>
                </div>
                <div className="tagAnswers"></div>
                </div>
                <div className="imageSample">
                <button id="upload_widget" className="addPhoto-button">
                    Upload Image
                </button>
                <div className="imageSampleHolder"></div>
                </div>
                <div className="formGroup">
                <button type="submit">Submit</button>
                </div>
            </form>
            </div>
    )
}

  