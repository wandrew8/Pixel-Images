import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PhotoStats.scss';

class PhotoStats extends Component {
    render() {
        const {likes, comments, createdAt, description, _id} = this.props.photo;

        return (
            <React.Fragment>
                <Link className="viewLink" to={`/photo/${_id}`}>View</Link>
                <div id="stats">
                    <div className="stats">
                        <div className="likes"><p>Comments: <em>{comments.length}</em><i className="far fa-comments"></i></p></div>
                        <div className="likes"><p>Likes: <em>{this.props.photo.likes}</em><i className="far fa-heart"></i></p></div>
                    </div>
                    <p id="statDescription">{description}</p>
                </div>
            </React.Fragment>
        )
    }
}

export default PhotoStats
