import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lottie from '../Lottie/Lottie';
import Toast from '../Toast/Toast';
import PhotoStats from '../PhotoStats/PhotoStats';
import UpdatePhotoForm from '../UpdatePhotoForm/UpdatePhotoForm';
import './PhotoComponent.scss';

class RenderPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            url: 'https://quiet-ravine-27369.herokuapp.com',
            playLottie: false,
            showToast: false,
            actionTaken: false,
            showUpdatePhotoModal: false,
        }
    }

    setStorage = (id) => {
        window.localStorage.setItem('likedPhotos', JSON.stringify([id]))
    }

    incrementLikes = (id) => {
        this.setState({ showToast: false })
        const storageData = JSON.parse(window.localStorage.getItem('likedPhotos')) || '';
        if(!storageData.includes(id)) {
            const url = this.state.url + `/photos/${id}`;
            fetch(url, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"_id": id})
            })
            .then((response) => response.json())
            .then((data) => {
                this.setStorage(id); 
                this.setState({updateLikes: true, playLottie: true})
                this.props.updatePhotos();
                this.addToFavorites(id)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        } else {
            this.setState({ showToast: true })
        }
    }

    addToFavorites = (id) => {
        const userId = window.sessionStorage.getItem('authorId');
        const url = this.state.url + `/users/${userId}/favorites`;
        if (userId) {
            if (userId !== this.props.photo.author[0]._id) {
                fetch(url, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"_id": id})
                    })
                    .then((response) => response.json())
                    .then((data) => {
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
            } else {
                console.log("You cannot add your own photos to favorites")
            }
        } else {
            console.log('You are not logged in')
        }
        
    }

    showModal = () => {
        this.setState({ show: true });
    }
      
    hideModal = () => {
        this.setState({ show: false });
    }

    deletePhoto = (id) => {
        const url = this.state.url + '/photos/' + id;
        const token = window.sessionStorage.getItem('token');
        fetch(url, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            }
            })
            .then((response) => response.json())
            .then((data) => {
                this.props.getAuthorPhotos();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    }

    updatePhoto = () => {
        console.log('Hello, you')
        this.setState({ showUpdatePhotoModal: true })
    }

    closeUpdatePhotoModal = () => {
        this.setState({ showUpdatePhotoModal: false })
    }

    unlikePhoto = (id) => {
        const authorId = window.sessionStorage.getItem('authorId');
        const url = this.state.url + '/users/' + authorId + '/favorites/' + id;
        const token = window.sessionStorage.getItem('token');
        fetch(url, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            }
            })
            .then((response) => response.json())
            .then((data) => {
                this.props.getLikedPhotos();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        const RenderDescription = () => {
            return (
                <div className="view">
                    <p>{this.props.photo.description}</p>
                </div>
            )
        }
       
        if(this.props.photo) {
                if(this.props.profile) {
                    if(this.props.isLiked) {
                        return (
                            <React.Fragment>
                                {this.state.showToast ? <Toast message="You already liked this photo" /> : null}
                                <Link className="link" to={`/photo/${this.props.photo._id}`}>
                                    <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                                </Link>
                                <div id="posted" className="category">
                                    <div onClick={this.unlikePhoto(null, this.props.photo._id)} className="delete"><i className="far fa-heart"></i><p>Remove Photo</p></div>
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                {this.state.showUpdatePhotoModal ? <UpdatePhotoForm updateAuthorPhotos={this.props.updateAuthorPhotos} photo={this.props.photo} handleClose={this.closeUpdatePhotoModal} /> : null}
                                {this.state.showToast ? <Toast message="You already liked this photo" /> : null}
                                <Link className="link" to={`/photo/${this.props.photo._id}`}>
                                    <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                                </Link>
                                <div id="posted" className="category">
                                    <div onClick={this.deletePhoto.bind(null, this.props.photo._id)} className="delete"><i className="fas fa-trash-alt"></i><p>Delete</p></div>
                                    <div onClick={this.updatePhoto} className="edit"><p>Edit Photo</p><i className="fas fa-edit"></i></div>  
                                </div>
                                <PhotoStats photo={this.props.photo} />
                            </React.Fragment>
                            )
                        }
                } else {
                    return (
                        <React.Fragment>
                            {this.state.showToast ? <Toast message="You already liked this photo" /> : null}
                            <Link to={`/photo/${this.props.photo._id}`}>
                                {this.props.photo.description ? <RenderDescription /> : null}
                                <img alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                            </Link>
                                <div className="category">
                                    <p>{this.props.photo.category}</p>
                                    <div className="stats">
                                        <div className="likes"><p>{this.props.photo.comments.length}</p><Link to={`/photo/${this.props.photo._id}`} ><i className="far fa-comments"></i></Link></div>
                                        <div onClick={this.incrementLikes.bind(null, this.props.photo._id)} className="likes"><p>{this.props.photo.likes}</p><i className="far fa-heart"></i></div>
                                    </div>
                                </div>
                            <Link to={`/author/${this.props.photo.author[0]._id}`} >
                                <div className="author">
                                    <Lottie play={this.state.playLottie}/>
                                    <img alt="" src={this.props.photo.author[0].userImage}/>
                                    <p>{this.props.photo.author[0].firstName} {this.props.photo.author[0].lastName}</p>
                                </div>
                            </Link>
                        </React.Fragment>
                        )
                }
        } else {
            return (
                <div className="error">
                    <p>Oops, We couldn't find any photos</p>
                </div>
            )
        }
    }
};




class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos,
        }
    }

        render() {
            if (this.props.photos.length > 0) {
                const photoCollection = this.props.photos.map(photo => {
                    return (
                        <div key={photo._id} className="photo" >
                            <RenderPhotos 
                                isLiked={this.props.isLiked} 
                                profile={this.props.profile} 
                                getAuthorPhotos={this.props.getAuthorPhotos}
                                reRenderPhotos={this.props.reRenderPhotos} 
                                updatePhotos={this.props.updatePhotos} 
                                updateHome={this.props.updateHome} 
                                key={photo._id} 
                                updateAuthorPhotos={this.props.updateAuthorPhotos}
                                getLikedPhotos={this.props.getLikedPhotos}
                                unlikePhoto={this.props.updateLikedPhotos}
                                photo={photo} />
                        </div>
                    )
                });
                if(this.props.photos.length < 10) {
                    return (
                        <div className="smallPhotoContainer">
                            {photoCollection}
                        </div>
                    )
                } else {
                    return (
                        <div className="photoContainer">
                            {photoCollection}
                        </div>
    
                    )
                }
 
            } else {
                return (
                    <div className="error">
                        <p>Sorry, we couldn't find any photos</p>
                    </div>
                )
            }
               
    }
};

export default Photo;
