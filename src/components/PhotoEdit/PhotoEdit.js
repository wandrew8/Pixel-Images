import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PhotoEdit.scss';


class RenderPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            // url: 'http://localhost:3000',
            url: 'https://quiet-ravine-27369.herokuapp.com',
        }
    }

    componentDidUpdate() {
        if (this.props.isLiked) {
            console.log("It's true")
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
                this.props.reRenderPhotos()
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
                this.props.reRenderPhotos()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {

        if(this.props.photo) {
            return (
                <React.Fragment>
                    <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                    <div className="category">
                    {this.props.isLiked ? 
                        <div onClick={this.unlikePhoto.bind(null, this.props.photo._id)} className="delete"><i class="far fa-heart"></i><p>Remove from Favorites</p></div> :
                        <div onClick={this.deletePhoto.bind(null, this.props.photo._id)} className="delete"><i class="fas fa-trash-alt"></i><p>Remove Photo</p></div> 
}
                    </div>
                    <SinglePhoto photo={this.props.photo} show={this.state.show} handleClose={this.hideModal}/>
                </React.Fragment>
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

const SinglePhoto = ({ handleClose, show, photo }) => {
    const showHideClassName = show ? 'singlePhoto' : 'singlePhoto hidden';
  
    
    return (
      <div className={showHideClassName}>
        <div onClick={handleClose} className="closeSinglePhoto"><i className="far fa-times-circle"></i></div>
            <div className="photo">
                <img alt="" data-id={photo._id} className="image" width="200" height="200" src={photo.imageUrl} />
            </div>
      </div>
    );
}; 


class PhotoEdit extends Component {
        render() {
            if (this.props.photos.length > 0) {

                const photoCollection = this.props.photos.map(photo => {
                    return (
                        <div key={photo._id} className="photo" >
                            <RenderPhotos isLiked={this.props.isLiked} reRenderPhotos={this.props.reRenderPhotos} updatePhotos={this.props.updatePhotos} updateHome={this.props.updateHome} key={photo._id} photo={photo} />
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
                        <p>You haven't posted any photos</p>
                    </div>
                )
            }
               
    }
};

export default PhotoEdit;
