import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PhotoEdit.scss';


class RenderPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            url: 'http://localhost:3000',
        }
    }

    componentDidUpdate() {
        if (this.state.photoDeleted) {

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

    render() {

        if(this.props.photo) {
            return (
                <React.Fragment>
                    <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                    <div className="category">
                        <p>{this.props.photo.category}</p>
                        <div onClick={this.deletePhoto.bind(null, this.props.photo._id)} className="delete"><p>Remove Photo</p><i class="fas fa-trash-alt"></i></div>
                    </div>
                    <Link to={`/author/${this.props.photo.author[0]._id}`} >
                        <div className="author">
                            <img alt="" src={this.props.photo.author[0].userImage}/>
                            <p>{this.props.photo.author[0].firstName} {this.props.photo.author[0].lastName}</p>
                        </div>
                    </Link>
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
                <div className="category">
                    <p>{photo.category}</p>
                </div>
                <Link className="author" to={`/author/${photo.author[0]._id}`} >
                        <img alt="" src={photo.author[0].userImage} />
                        <p>{photo.author[0].firstName} {photo.author[0].lastName}</p>
                </Link>
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
                            <RenderPhotos reRenderPhotos={this.props.reRenderPhotos} updatePhotos={this.props.updatePhotos} updateHome={this.props.updateHome} key={photo._id} photo={photo} />
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
