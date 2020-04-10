import React, { Component } from 'react';
import moment from 'moment';
import './Comment.scss';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.comment.likes,
            dislikes: this.props.comment.dislikes,
            text: this.props.comment.text,
            liked: false,
            disliked: false,
            url: 'http://localhost:3000'

        }
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);

    }

    handleLike() {
        this.setState({ liked: !this.state.liked})
        if(!this.state.liked) {
            this.incrementLikes();
        } else {
            this.decrementLikes();
        }
    }

    handleDislike() {
        this.setState({ disliked: !this.state.disliked})
        if(!this.state.disliked) {
            this.incrementDislikes();
        } else {
            this.decrementDislikes();
        }
    }

    updateData() {
        const body = {
            likes: this.state.likes,
            dislikes: this.state.dislikes,
            text: this.state.text,
        }
        console.log(body)
        const url = `${this.state.url}/photos/${this.props.photoId}/comments/${this.props.comment._id}`;
        fetch(url, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    incrementLikes() {
        this.setState({ likes: this.state.likes + 1 })
        this.updateData();
    }

    decrementLikes() {
        this.setState({ likes: this.state.likes - 1 })
        this.updateData();

    }

    incrementDislikes() {
        this.setState({ dislikes: this.state.dislikes + 1 })
        this.updateData();

    }

    decrementDislikes() {
        this.setState({ dislikes: this.state.dislikes - 1 })
        this.updateData();

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
                            <i onClick={this.handleLike} className={ this.state.liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i><p>{this.state.likes}</p>
                            <i onClick={this.handleDislike} className={ this.state.disliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i><p>{this.state.dislikes}</p>
                        <small>Reply</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment