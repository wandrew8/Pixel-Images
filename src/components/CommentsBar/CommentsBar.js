import React from 'react';
import moment from 'moment';
import './CommentsBar.scss';



class CommentsBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            url: 'http://localhost:3000',
            commentsData: [],
            comment: '',
            error: '',

        }
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getComments = () => {
        const url = `${this.state.url}/photos/${this.props.photo._id}/comments`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({commentsData: data})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    RenderComments() {
        if (this.state.commentsData.length > 0) {
            const comments = this.state.commentsData.map(comment => {
                return (
                    <div key={comment._id} className="singleComment">
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
            })
            return comments;
        } else {
            return (
                <p className="noComment">No Comments</p>
            )
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.postComment()
    }

    postComment = (e) => {
        const authorId = window.sessionStorage.getItem('authorId')
        if (authorId) {
            const url = this.state.url + '/photos/' + this.props.photo._id + '/comments'
            const comment = {
                text: this.state.comment,
                author: authorId,
                likes: 0,
                dislikes: 0,
            }
            fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(comment),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.setState({comment: ''}) 
                this.getComments();
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        } else {
            this.setState({error: 'You must be signed in to post a comment'})
            console.log('Oops, you must be signed in to post a comment')
        }
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        const {photo} = this.props;
        return(
            <div className="commentsGrid">
                <div className="authorName">
                    <img src={photo.author[0].userImage} alt={photo.author[0].firstName} />
                    <div className="name">
                        <h3>{`${photo.author[0].firstName} ${photo.author[0].lastName}`}</h3>
                        <p>Posted: {moment(new Date(photo.createdAt), "YYYYMMDD").fromNow()}</p>
                    </div>
                </div>
                <div className="commentsHolder">
                    {this.RenderComments()}
                </div>
                <div className="addComment">
                    <form onSubmit={this.handleSubmit} id="addComment">
                        <input 
                            type="text"
                            name="comment" 
                            required 
                            value={this.state.comment}
                            onChange={this.handleInputChange}
                            placeholder="Add a comment" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CommentsBar;



