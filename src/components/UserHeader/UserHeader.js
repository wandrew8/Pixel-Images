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
            category: '',
            tags: [],
            imageUrl: '',
            author: '',
            uploadImage: false,
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
                        <div onClick={this.openPhotoModal} className="searchButton"><i className="fas fa-camera-retro"></i></div>
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


class AddPhotoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'Art',
            tags: ["lines", "patters", "blue", "cool", "design", "geometric"],
            imageUrl: '',
            author: window.sessionStorage.getItem('authorId'),
            uploadImage: false,
            url: 'http://localhost:3000'
        };
    }
    openWidget = event => {
        event.preventDefault();
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: "dcokaa0ia",
            uploadPreset: 'pixelImages'
        }, (error, result) => {
            if (result.event === "success") {
                this.setState({
                    uploadImage: true,
                    imageUrl: result.info.url
                })
            }
        });
        myWidget.open();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const photo = {
            category: this.state.category,
            tags: this.state.tags,
            imageUrl: this.state.imageUrl,
            author: this.state.author,
        }
        console.log(photo);
        const token = window.sessionStorage.getItem('token');
        console.log(token)
        const url = this.state.url + '/photos'
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(photo),
            })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            this.setState({
                category: '',
                tags: '',
                imageUrl: '',
                author: '',
            });
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        
    };
    
    render() {
        
        const RenderImage = () => {
            return <img src={this.state.imageUrl} alt="" />
        };
        const showHideClassName = this.props.show ? 'formModal' : 'formModal hideModal';

            return (
                <div className={showHideClassName}>
            <form id="addPhotoForm">
                <h2>ADD YOUR OWN PHOTO</h2>
                <div onClick={this.props.handleClose} className="closeModal"><i className="far fa-times-circle"></i></div>
               
                <div className="formGroup">
                <label htmlFor="category">Category</label>
                <select 
                    onChange={this.handleInputChange}
                    value={this.state.category}
                    required 
                    id="category">
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
                    <input 
                    value={this.state.tags}
                    onChange={this.handleInputChange}
                    list="tags" 
                    id="tagInput" />
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
                <button onClick={this.openWidget} id="upload_widget" className="addPhoto-button">
                    Upload Image
                </button>
                <div className="imageSampleHolder">{this.state.uploadImage ? <RenderImage /> : ''}</div>
                </div>
                <div className="formGroup">
                <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
                </div>
            </form>
            </div>
    )
    }
}


