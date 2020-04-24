import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PhotoStats.scss';

class PhotoStats extends Component {
    render() {
        const { comments, likes, _id} = this.props.photo;

        return (
            <React.Fragment>
                <Link className="viewLink" to={`/photo/${_id}`}>View</Link>
                <div id="stats">
                    <div className="statText">
                        <div className="stats">
                            <div className="likes"><p>Comments: <em>{comments.length}</em><i className="far fa-comments"></i></p></div>
                            <div className="likes"><p>Likes: <em>{likes}</em><i className="far fa-heart"></i></p></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PhotoStats
