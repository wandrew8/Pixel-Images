import React, { Component, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './UserHeader.scss';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            scrollPosition: 0,
            addPhoto: false,
            author: window.sessionStorage.getItem('authorId'),
            category: '',
            tags: [],
            imageUrl: '',
            uploadImage: false,
            query: '',
            url: 'http://localhost:3000',
            loggedOut: false,
        };
        this.logoutUser = this.logoutUser.bind(this)
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    logoutUser(e) {
        console.log('hello')
        sessionStorage.clear();
        this.setState({loggedOut: true})

    }

    renderRedirect = () => {
        if (this.state.loggedOut) {
            return <Redirect to='/' />
        }
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
                        <Link to={`/profile/${this.state.author}/posted`} className="searchButton"><i className="fas fa-user-circle"></i>Profile</Link>
                        <div onClick={this.openPhotoModal} className="searchButton"><i className="fas fa-camera-retro"></i>Add Photo</div>
                        <div onClick={this.logoutUser} className="formButton"><button><i className="fas fa-sign-out-alt"></i>Logout</button></div>
                    </div>
                </header>
                <Modal history={useHistory} show={this.state.show} handleInputChange={this.handleInputChange.bind(this)} handleQuery={this.handleQuery} handleClose={this.hideModal} />
                <AddPhotoModal show={this.state.addPhoto} handleClose={this.closePhotoModal} />
                {this.renderRedirect()}
            </div>
        )
    }
}

const Modal = ({ handleClose, show , history}) => {
    const [query, setQuery] = useState('')  
    const showHideClassName = show ? 'searchbar' : 'searchbar hideSearchBar';
    const historyObj = history();
  
    function submitForm(e) {
    e.preventDefault();
    console.log(query)
    console.log(historyObj)
    if(query) historyObj.push('/search/' + query);
    }  
    return (
      <div className={showHideClassName}>
        <div onClick={handleClose} className="closeBar"><i className="far fa-times-circle"></i></div>
        <form onSubmit={submitForm} id="searchForm">
            <input required onChange={e => setQuery(e.target.value)} name="query" id="searchTags" />
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
            category: '',
            tags: [],
            imageUrl: '',
            author: window.sessionStorage.getItem('authorId'),
            uploadImage: false,
            url: 'http://localhost:3000',
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
                console.log(data)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            this.props.handleClose();
            this.setState({
                category: '',
                tags: [],
                imageUrl: '',
                author: '',
                success: true
            });
        
    };
    removeItem = event => {
        const value = event.target.textContent;
        const index = this.state.tags.indexOf(value);
        this.setState({tags: this.state.tags.slice(0, index).concat(this.state.tags.slice(index + 1, this.state.tags.length))});
    }

    renderRedirect = () => {
        if (this.state.success) {
            return <Redirect to='/user' />
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
                <div className={showHideClassName}>
            <form onSubmit={this.handleFormSubmit} id="addPhotoForm">
                <h2>ADD YOUR OWN PHOTO</h2>
                <div onClick={this.props.handleClose} className="closeModal"><i className="far fa-times-circle"></i></div>
               
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
                <label htmlFor="tags">Add some tags to describe your image</label>
                <div className="row">
                    <input 
                    value={this.state.tag}
                    onChange={this.handleInputChange}
                    name="tag"
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
                    <button disabled={this.state.tag ? false : true} onClick={this.updateTags} id="addTagButton"><i className="fas fa-plus"></i></button>
                </div>
                <div className="tagAnswers"><RenderTags /></div>
                </div>
                <div className="imageSample">
                <button onClick={this.openWidget} id="upload_widget" className="addPhoto-button">
                    Upload Image
                </button>
                <div className="imageSampleHolder">{this.state.uploadImage ? <RenderImage /> : ''}</div>
                </div>
                <div className="formGroup">
                <button disabled={this.state.uploadImage ? false : true}>Submit</button>
                </div>
            </form>
            {this.renderRedirect()}
            </div>
    )
    }
}


