import React from 'react';
import moment from 'moment';
import './CommentsBar.scss';

class CommentsBar extends React.Component {
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

                </div>
                <div className="addComment">
                    <form id="addComment">
                        <input name="comment" placeholder="Add a comment" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CommentsBar;