import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';


class RenderPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            url: 'http://localhost:3000',
        }
    }

    setStorage = (id) => {
        window.localStorage.setItem('likedPhotos', JSON.stringify([id]))
    }

    incrementLikes = (id) => {
        const storageData = JSON.parse(localStorage.likedPhotos)
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
                this.setState({updateLikes: true})
                this.props.updatePhotos();
                this.addToFavorites(id)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        } else {
            console.log('You already liked this photo')
        }
    }

    addToFavorites = (id) => {
        const userId = window.sessionStorage.getItem('authorId');
        const url = this.state.url + `/users/${userId}/favorites`;
        if (userId) {
            fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"_id": id})
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                console.error('Error:', error);
                });
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
        console.log(token)
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
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
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
                console.log('Success:', data);
                // this.props.reRenderPhotos()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {

        if(this.props.photo) {
            if(this.props.profile) {
                return (
                    <React.Fragment>
                        <Link to={`/photo/${this.props.photo._id}`}>
                            <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                        </Link>
                        <div className="category">
                            {this.props.isLiked ? 
                                <div onClick={this.unlikePhoto.bind(null, this.props.photo._id)} className="delete"><i className="far fa-heart"></i><p>Remove from Favorites</p></div> :
                                <div onClick={this.deletePhoto.bind(null, this.props.photo._id)} className="delete"><i className="fas fa-trash-alt"></i><p>Remove Photo</p></div> 
                            }
                        </div>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>

                    <Link to={`/photo/${this.props.photo._id}`}>
                        <img alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                    </Link>
                        <div className="category">
                            <p>{this.props.photo.category}</p>
                            <div className="stats">
                                <div className="likes"><p>{this.props.photo.comments.length}</p><i className="far fa-comments"></i></div>
                                <div onClick={this.incrementLikes.bind(null, this.props.photo._id)} className="likes"><p>{this.props.photo.likes}</p><i className="far fa-heart"></i></div>
                            </div>
                        </div>
                        <Link to={`/author/${this.props.photo.author[0]._id}`} >
                            <div className="author">
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
        render() {
            if (this.props.photos.length > 0) {

                const photoCollection = this.props.photos.map(photo => {
                    return (
                        <div key={photo._id} className="photo" >
                            <RenderPhotos profile={this.props.profile} updatePhotos={this.props.updatePhotos} updateHome={this.props.updateHome} key={photo._id} photo={photo} />
                        </div>
                    )
                });
                return (
                    <div className="photoContainer">
                    {photoCollection}
                </div>

                )
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
