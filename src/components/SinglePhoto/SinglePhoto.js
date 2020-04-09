import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CommentsBar from '../../components/CommentsBar/CommentsBar';
import './SinglePhoto.scss';


class SinglePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:3000',
            photo: [],
            isLoading: true,
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

    goBack = () => {
        const { history } = this.props;
        console.log(history)
        if(history) history.goBack();
    }

    componentDidMount() {
        this.getPhoto();
    }

    getPhoto = () => {
        const url = this.state.url + "/photos/" + this.props.photo
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({photo: data, isLoading: false})
            console.log(this.state.photo)
            console.log(this.state.photo.author[0].firstName)
            console.log(this.state.photo.author[0])
        })
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <React.Fragment>

                <div className="singlePhoto">                    
                    <div onClick={this.goBack} className="closeSinglePhoto"><i className="far fa-times-circle"></i></div>
                    <div className="photoGrid">
                        <div className="photo">
                            <img alt="" data-id={this.state.photo._id} className="image" width="200" height="200" src={this.state.photo.imageUrl} />
                            <div className="category">
                                <p>{this.state.photo.category}</p>
                                <div onClick={this.incrementLikes.bind(null, this.state.photo._id)} className="likes"><p>{this.state.photo.likes}</p><i className="far fa-heart"></i></div>
                            </div>
                            <Link className="author" to={`/author/${this.state.photo.author[0]._id}`} >
                                    <img alt="" src={this.state.photo.author[0].userImage} />
                                    <p>{this.state.photo.author[0].firstName} {this.state.photo.author[0].lastName}</p>
                            </Link>
                        </div>
                        <CommentsBar photo={this.state.photo} />
                    </div>
                </div>
                <div className="singlePhotoPage"></div>
                </React.Fragment>

            )   
        }
            
    }; 
}

export default withRouter(SinglePhoto);
