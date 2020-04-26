import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            url: 'https://quiet-ravine-27369.herokuapp.com',

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

    updateData(data) {
        const url = `${this.state.url}/photos/${this.props.photoId}/comments/${this.props.comment._id}`;
        fetch(url, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('success', data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    incrementLikes() {
        const body = {
            likes: this.state.likes + 1,
            dislikes: this.state.dislikes,
            text: this.state.text,
        }
        this.updateData(body);
        this.setState({ likes: this.state.likes + 1 })
    }

    decrementLikes() {
        const body = {
            likes: this.state.likes - 1,
            dislikes: this.state.dislikes,
            text: this.state.text,
        }
        this.updateData(body);
        this.setState({ likes: this.state.likes - 1 })
    }

    incrementDislikes() {
        const body = {
            likes: this.state.likes,
            dislikes: this.state.dislikes + 1,
            text: this.state.text,
        }
        this.updateData(body);
        this.setState({ dislikes: this.state.dislikes + 1 })
    }

    decrementDislikes() {
        const body = {
            likes: this.state.likes,
            dislikes: this.state.dislikes - 1,
            text: this.state.text,
        }
        this.updateData(body);
        this.setState({ dislikes: this.state.dislikes - 1 })
    }

    render() {
        const { comment } = this.props;
        return (
            <div className="singleComment">
                <div className="authorPhoto">
                    <Link to={`/author/${comment.author._id}`}>
                        <img src={comment.author.userImage} alt={comment.author.firstName} />
                    </Link>
                </div>
                <div className="commentText">
                    <Link to={`/author/${comment.author._id}`}>
                        <small>{`${comment.author.firstName} ${comment.author.lastName} | ${moment(new Date(comment.createdAt), "YYYYMMDD").fromNow()}`}</small>
                    </Link>
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
