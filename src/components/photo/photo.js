import React, { Component } from 'react';
import './Photo.scss';


class RenderPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }

    componentDidMount() {
        
    };

    showModal = () => {
        this.setState({ show: true });
    }
      
      hideModal = () => {
        this.setState({ show: false });
    }

    render() {

        if(this.props.photo) {
            return (
                <React.Fragment>
                    <img onClick={this.showModal} alt={this.props.photo.tags[0]} data-id={this.props.photo._id} className="image" width="200" height="200" src={this.props.photo.imageUrl} />
                    <div className="category">
                        <p>{this.props.photo.category}</p>
                        <div className="likes"><p>{this.props.photo.likes}</p><i className="far fa-heart"></i></div>
                    </div>
                    <div className="author">
                        <img alt="" src={this.props.photo.author[0].userImage}/>
                        <p>{this.props.photo.author[0].firstName} {this.props.photo.author[0].lastName}</p>
                    </div>
                    <SinglePhoto photo={this.props.photo} show={this.state.show} handleClose={this.hideModal}/>
                </React.Fragment>
        )
    } else {
        return (
            <div>
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
                    <div className="likes"><p>{photo.likes}</p><i className="far fa-heart"></i></div>
                </div>
                <div className="author">
                    <img alt="" src={photo.author[0].userImage} />
                    <p>{photo.author[0].firstName} {photo.author[0].lastName}</p>
                </div>
            </div>
      </div>
    );
}; 


class Photo extends Component {
        render() {
            if (this.props.photos.length > 0) {

                const photoCollection = this.props.photos.map(photo => {
                    return (
                        <div key={photo._id} className="photo" >
                            <RenderPhotos key={photo._id} photo={photo} />
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
                    <div>
                        <p>Sorry, we couldn't find any photos</p>
                    </div>
                )
            }
               
    }
};

export default Photo;
