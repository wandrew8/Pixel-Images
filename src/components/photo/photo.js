import React, { Component } from 'react';
import './Photo.scss';


function RenderPhotos(props) {
    if(props.photo) {
        return (
            <div key={props.photo._id} className="photo" >
                <img alt={props.photo.tags[0]}data-id={props.photo._id} className="image" width="200" height="200" src={props.photo.imageUrl} />
                <div className="category">
                    <p>{props.photo.category}</p>
                    <div className="likes"><p>{props.photo.likes}</p><i className="far fa-heart"></i></div>
                </div>
                <div className="author">
                    <img alt="" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"/>
                    <p>{props.photo.author}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>Oops, We couldn't find any photos</p>
            </div>
        )
    }
}
class Photo extends Component {
        render() {
            const photoCollection = this.props.photos.map(photo => {
                return (
                        <React.Fragment>
                            <RenderPhotos photo={photo} />
                        </React.Fragment>
                    )
            });
            return (
                <div className="photoContainer">
                    {photoCollection}
                </div>

            )
               
    }
};

export default Photo;
