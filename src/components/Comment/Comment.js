import React, { Component } from 'react';
import moment from 'moment';
import './Comment.scss';

class Comment extends Component {
    render() {
        const { comment } = this.props;
        return (
            <div className="singleComment">
                <div className="authorPhoto">
                    <img src={comment.author.userImage} alt={comment.author.firstName} />
                </div>
                <div className="commentText">
                    <small>{`${comment.author.firstName} ${comment.author.lastName} | ${moment(new Date(comment.createdAt), "YYYYMMDD").fromNow()}`}</small>
                    <p>{comment.text}</p>
                    <div className="statusBar">
                            <i className="far fa-thumbs-up"></i><p>{comment.likes}</p>
                            <i className="far fa-thumbs-down"></i><p>{comment.dislikes}</p>
                        <small>Reply</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment
