import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentsBar from '../CommentsBar/CommentsBar';
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

    render() {

        if(this.props.photo) {
            return (
                <Link to={`/photo/${this.props.photo._id}`}>
                    <img alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                    <div className="category">
                        <p>{this.props.photo.category}</p>
                        <div className="stats">
                            <div className="likes"><p>{this.props.photo.comments.length}</p><i class="far fa-comments"></i></div>
                            <div onClick={this.incrementLikes.bind(null, this.props.photo._id)} className="likes"><p>{this.props.photo.likes}</p><i className="far fa-heart"></i></div>
                        </div>
                    </div>
                    <Link to={`/author/${this.props.photo.author[0]._id}`} >
                        <div className="author">
                            <img alt="" src={this.props.photo.author[0].userImage}/>
                            <p>{this.props.photo.author[0].firstName} {this.props.photo.author[0].lastName}</p>
                        </div>
                    </Link>
                </Link>
        )
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
                            <RenderPhotos updatePhotos={this.props.updatePhotos} updateHome={this.props.updateHome} key={photo._id} photo={photo} />
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
