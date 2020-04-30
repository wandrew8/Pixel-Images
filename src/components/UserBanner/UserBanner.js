import React from 'react';
import moment from 'moment';
import './UserBanner.scss';


class UserBanner extends React.Component {
    render() {
        const RenderBio = (props) => {
            return (
                <div className="bioContainer">
                    <h2 className="biography">Biography</h2>
                    <p>{props.bio}</p>
                </div>
            )
        }
        const { firstName, lastName, userImage, createdAt, bio } = this.props.author;
        return (
            <div className="mainBanner">
                <div className="bannerGrid">
                    <div className="userBanner">
                        <img src={userImage} alt={`${firstName}`} />
                        <div className="authorName">
                            <h2>{firstName} {lastName}</h2>
                            <p>Joined: {moment(new Date(createdAt)).format("MMMM Do, YYYY")}</p>
                        </div>
                    </div>
                    {bio ? <RenderBio bio={bio}/> : null}
                </div>
            </div>
        )
    }
}

export default UserBanner;