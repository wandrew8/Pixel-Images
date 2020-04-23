import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Lottie from '../Lottie/Lottie';
import Toast from '../Toast/Toast';
import Loader from '../Loader/Loader';
import CommentsBar from '../../components/CommentsBar/CommentsBar';
import './SinglePhoto.scss';


class SinglePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'https://quiet-ravine-27369.herokuapp.com',
            photo: [],
            isLoading: true,
            playLottie: false,
            updateLikes: false,
            likes: 0,
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
                this.setState({updateLikes: true, playLottie: true, likes: this.state.likes + 1})
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
            if (!data) {
                this.setState({photo: []})
            } else {
                this.setState({photo: data, isLoading: false, likes: data.likes})
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        const RenderDescription = () => {
            return (
                <div id="view">
                    <p>{this.state.photo.description}</p>
                </div>
            )
        }
        if(this.state.isLoading) {
            return (
                <Loader />
            )
        } else {
            return (
                <React.Fragment>
                    {this.state.showToast ? <Toast message="You already liked this photo" /> : null}
                    <div id="singlePhoto" className="singlePhoto">                    
                        <div onClick={this.goBack} className="closeSinglePhoto"><i className="far fa-times-circle"></i></div>
                        <div id="photoGrid" className="photoGrid">
                            <div id="photo" className="photo">
                                {this.state.photo.description ? <RenderDescription /> : null}
                                <img alt="" data-id={this.state.photo._id} className="image" width="200" height="200" src={this.state.photo.imageUrl} />
                                <div id="category">
                                    <p>{this.state.photo.category}</p>
                                    <div onClick={this.incrementLikes.bind(null, this.state.photo._id)} className="likes"><p>{this.state.likes}</p><i className="far fa-heart"></i></div>
                                </div>
                                <Link id="author" to={`/author/${this.state.photo.author[0]._id}`} >
                                    <Lottie play={this.state.playLottie}/>
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
