import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Toast from '../Toast/Toast';
import logo from '../../assets/images/icons/android-chrome-512x512.png'
import './SmallHeader2.scss';

const Modal = ({ handleClose, show, history }) => {
    const [query, setQuery] = useState('')  
    const showHideClassName = show ? 'searchbar' : 'searchbar hideSearchBar';
    const historyObj = history();
  
      function submitForm(e) {
        e.preventDefault();
        if(query) historyObj.push('/search/' + query);
      }
        return (
        <div className={showHideClassName}>
          <div onClick={handleClose} className="closeBar"><i className="far fa-times-circle"></i></div>
          <form id="searchForm">
              <input required onChange={e => setQuery(e.target.value)} name="query" id="searchTags" />
              <button id="submitSearch" onClick={submitForm}>
                <i className="fas fa-search"></i> Search
              </button>
          </form>
        </div>
      );
  }; 

class SmallHeader2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: 100,
            loggedOut: false,
            showNav: false,
            category: '',
            tags: [],
            imageUrl: '',
            uploadImage: false,
            query: '',
            url: 'https://quiet-ravine-27369.herokuapp.com',
            addPhoto: false,
            author: window.sessionStorage.getItem('authorId'),

        }
        this.showNav = this.showNav.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    openPhotoModal = () => {
        this.setState({ addPhoto: true })
    }

    closePhotoModal = () => {
        this.setState({ addPhoto: false })
    }

    logoutUser = (e) => {
        sessionStorage.clear();
        this.setState({ loggedOut: true })

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

    showNav() {
        this.setState({ showNav: !this.state.showNav })
    }

    showModal = () => {
        this.setState({ show: true });
    }
      
    hideModal = () => {
        this.setState({ show: false });
    }
    
    handleQuery(e) {
        e.preventDefault();
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    renderRedirect = () => {
        if (this.state.loggedOut) {
            return <Redirect to='/' />
        }
    }

    

    render () {
        const styledHeader = {
            height: this.state.scrollPosition > 0.05 ? '60px' : '100px',
            opacity: this.state.scrollPosition > 0.05 ? '0.8' : '1',

        }

        function MenuBar(props) {    
            return (
                <div className={props.scrollPosition > 0.05 ? "menuShort" : "menu"}>
                    <ul>
                        <li onClick={props.showModal} className="searchButton"><i className="fas fa-search"></i>Search</li>
                        <Link to="/" className="searchButton"><li><i className="fas fa-home"></i>Home</li></Link>
                        <Link to={`/profile/${props.author}/posted`} className="searchButton"><li><i className="fas fa-user-circle"></i>View Profile</li></Link>
                        <li onClick={props.openPhotoModal} className="searchButton"><i className="fas fa-camera-retro"></i>Add Photo</li>
                        <li onClick={props.logoutUser} className="formButton"><i className="fas fa-sign-out-alt"></i>Logout</li>
                    </ul>
                    <AddPhotoModal show={props.addPhoto} handleClose={props.closePhotoModal} />
                    {props.renderRedirect()}
                </div>
            )
        }

        return(
            <div>
                <header className="header">
                    <Link to="/"><img className="logo" src={logo} alt="" /><h1>Pixel Images</h1></Link>
                    <div className="mobileHeader">
                        <i onClick={this.showNav} className="fas fa-chevron-down"></i>
                    </div>
                </header>
                <Modal history={useHistory} show={this.state.show} handleInputChange={this.handleInputChange.bind(this)} handleQuery={this.handleQuery} handleClose={this.hideModal} /> 
                {this.state.showNav ? <MenuBar closePhotoModal={this.closePhotoModal} renderRedirect={this.renderRedirect} addPhoto={this.state.addPhoto} logoutUser={this.logoutUser} closeModal={this.closeModal} openPhotoModal={this.openPhotoModal} author={this.state.author} showModal={this.showModal} scrollPosition={this.state.scrollPosition} /> : null}
            </div>
            
        )
    }
}

export default SmallHeader2;

class AddPhotoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            tags: [],
            imageUrl: '',
            description: '',
            author: window.sessionStorage.getItem('authorId'),
            uploadImage: false,
            url: 'https://quiet-ravine-27369.herokuapp.com',
            tag: '',
            success: false,
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

    change = event => {
        this.setState({category: event.target.value});
    }

    updateTags = event => {
        event.preventDefault();
        this.setState({tags: [...this.state.tags, this.state.tag]})
        this.setState({tag: ''});
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const photo = {
            category: this.state.category,
            tags: this.state.tags,
            imageUrl: this.state.imageUrl,
            author: this.state.author,
            description: this.state.description,
        }
        const token = window.sessionStorage.getItem('token');
        const url = this.state.url + '/photos';
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
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            this.props.handleClose();
            this.setState({
                category: '',
                tags: [],
                imageUrl: '',
                description: '',
                success: true
            });
        
    };
    removeItem = event => {
        const value = event.target.textContent;
        const index = this.state.tags.indexOf(value);
        this.setState({tags: this.state.tags.slice(0, index).concat(this.state.tags.slice(index + 1, this.state.tags.length))});
    }

    showToast() {
        return <Toast message={"You have added a photo"} />
    }

    renderRedirect = () => {
        if (this.state.success) {
            this.showToast()
            const url = `/profile/${this.state.author}/posted`
            return <Redirect to={url} />
        }
    }
    
    render() {
        
        const RenderImage = () => {
            return <img src={this.state.imageUrl} alt="" />
        };
        const showHideClassName = this.props.show ? 'formModal' : 'formModal hideModal';

        const RenderTags = () => {
            const tags = this.state.tags.map(tag => {
                return (<p onClick={this.removeItem} key={tag} className="smallTag">{tag}</p>);
            })
            return tags;
        
        }
            return (
                <React.Fragment>
                    {this.state.success ? <Toast message="New Image Uploaded Successfully" /> : null}
                    <div className={showHideClassName}>
                        <form onSubmit={this.handleFormSubmit} id="addPhotoForm">
                            <h2>ADD YOUR OWN PHOTO</h2>
                            <div onClick={this.props.handleClose} className="closeModal"><i className="far fa-times-circle"></i></div>
                            <div className="imageSample">
                            <div className="formGroup">
                                
                            <label>Choose an image to upload</label>
                            <div onClick={this.openWidget} id="upload_widget" className="addPhoto-button uploadButton">
                                Upload Image
                            </div>
                            </div>
                            <div className="imageSampleHolder">{this.state.uploadImage ? <RenderImage /> : ''}</div>
                            </div>
                            <div className="formGroup">
                            <label htmlFor="category">Category</label>
                            <select 
                                onChange={this.change}
                                value={this.state.category}
                                required 
                                name="category"
                                id="category">
                                <option value="">Select a category...</option>
                                <option value="architecture">Architecture</option>
                                <option value="animals">Animals</option>
                                <option value="nature">Nature</option>
                                <option value="aerial">Aerial</option>
                                <option value="food">Food</option>
                                <option value="portrait">Portrait</option>
                                <option value="fashion">Fashion</option>
                                <option value="activity">Activity</option>
                                <option value="art">Art</option>
                            </select>
                            </div>
                            <div className="formGroup">
                            <label htmlFor="description">Description (optional)</label>
                                <textarea 
                                    rows="4" 
                                    placeholder="Describe your picture..."
                                    cols="50" 
                                    name="description" 
                                    id="description" 
                                    onChange={this.handleInputChange} 
                                    value={this.state.description} />
                            </div>
                            <div className="formGroup">
                            <label htmlFor="tags">Add some tags to describe your image</label>
                            <div className="row">
                                <input 
                                    value={this.state.tag}
                                    onChange={this.handleInputChange}
                                    name="tag"
                                    placeholder="Choose or type a tag name and press enter"
                                    id="tagInput" />
                                <button disabled={this.state.tag ? false : true} onClick={this.updateTags} id="addTagButton"><i className="fas fa-plus"></i></button>
                            </div>
                            <div className="tagAnswers"><RenderTags /></div>
                            </div>
                            <div className="formGroup">
                            <button disabled={this.state.uploadImage ? false : true}>Submit</button>
                            </div>
                        </form>
                    </div>
                    {this.renderRedirect()}
                </React.Fragment>
    )
    }
}

