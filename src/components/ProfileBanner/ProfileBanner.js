import React from 'react';
import moment from 'moment';
import './ProfileBanner.scss';


class UserBanner extends React.Component {
    render() {
        const { firstName, lastName, userImage, createdAt } = this.props.author;
        return (
            <div className="banner">
                <div className="editButton">Edit Profile<i className="fas fa-pencil-alt"></i></div>
                <div className="userBanner">
                    <img src={userImage} alt={`${firstName}`} />
                    <div className="authorName">
                        <h2>{firstName} {lastName}</h2>
                        <p>Joined: {moment(new Date(createdAt)).format("MMMM Do, YYYY")}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBanner;