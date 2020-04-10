import React, { Component } from 'react';
import moment from 'moment';
import './Comment.scss';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.comment.likes,
            dislikes: this.props.comment.dislikes,
            liked: false,
            disliked: false,

        }
    }

    handleLike = () => {
        this.setState({ liked: !this.state.liked})
        if(!this.state.liked) {
            this.incrementLikes();
        } else {
            this.decrementLikes();
        }
    }

    handleDislike = () => {
        this.setState({ disliked: !this.state.disliked})
        if(!this.state.disliked) {
            this.incrementDislikes();
        } else {
            this.decrementDislikes();
        }
    }

    incrementLikes = () => {
        console.log('You liked this comment')
        this.setState({ likes: this.state.likes + 1 })
    }

    decrementLikes = () => {
        console.log('You unliked this comment')
        this.setState({ likes: this.state.likes - 1 })

    }

    incrementDislikes = () => {
        console.log('You disliked this comment')
        this.setState({ dislikes: this.state.dislikes + 1 })

    }

    decrementDislikes = () => {
        console.log('You retracted your dislike')
        this.setState({ dislikes: this.state.dislikes - 1 })

    }

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
                            <i onClick={this.handleLike} className="far fa-thumbs-up"></i><p>{this.state.likes}</p>
                            <i onClick={this.handleDislike} className="far fa-thumbs-down"></i><p>{this.state.dislikes}</p>
                        <small>Reply</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment
