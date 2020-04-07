import React from 'react';
import moment from 'moment';
import './CommentsBar.scss';



class CommentsBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            url: 'http://localhost:3000',
            commentsData: [],
        }
        
    }

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
                    <div className="singleComment">
                        <div className="authorPhoto">
                            <img src={comment.author.userImage} alt={comment.author.firstName} />
                        </div>
                        <div className="commentText">
                            <small>{`${comment.author.firstName} ${comment.author.lastName} | ${moment(new Date(comment.createdAt)).startOf('day').fromNow()}`}</small>
                            <p>{comment.text}</p>
                            <div className="statusBar">
                                    <i className="far fa-thumbs-up"></i><p>4</p>
                                    <i className="far fa-thumbs-down"></i><p>10</p>
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

    submitComment = () => {

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
                        <p>Posted: {moment(new Date(photo.createdAt)).startOf('day').fromNow()}</p>
                    </div>
                </div>
                <div className="commentsHolder">
                    {this.RenderComments()}
                </div>
                <div className="addComment">
                    <form id="addComment">
                        <input name="comment" required placeholder="Add a comment" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CommentsBar;



