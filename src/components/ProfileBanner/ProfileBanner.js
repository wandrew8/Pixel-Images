import React from 'react';
import moment from 'moment';
import './ProfileBanner.scss';
import UpdateProfileForm from '../UpdataProfileForm/UpdateProfileForm';


class UserBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            updatedInfo: false,
            firstName: '',
            lastName: '',
            bio: '',
            userImage: '',
        }
    }

    showForm = () => {
        this.setState({ showForm: true });
    }

    closeForm = () => {
        this.setState({ showForm: false });
    }

    updateAuthorInfo = (data) => {
        this.setState({
            updatedInfo: true,
            firstName: data.firstName,
            lastName: data.lastName,
            bio: data.bio,
            userImage: data.userImage,
        })
    }

    renderForm = () => {
        return (
            <div className="formContainer">
                <UpdateProfileForm updateAuthorInfo={this.updateAuthorInfo} closeForm={this.closeForm} author={this.props.author} />
            </div>
        )
    }
    render() {
        const RenderBio = (props) => {
            return (
                <div className="bioContainer">
                    <h2 className="biography">Biography</h2>
                    <p>{props.bio}</p>
                </div>
            )
        }
        if(this.state.updatedInfo) {
            const { firstName, lastName, userImage, bio } = this.state;
            const { createdAt } = this.props.author; 
            return (
                <div className="banner">
                    <div onClick={this.showForm}className="editButton">Edit Profile<i className="fas fa-pencil-alt"></i></div>
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
                    {this.state.showForm ? this.renderForm() : null}
                </div>
            )
        } else {
            const { firstName, lastName, userImage, createdAt, bio } = this.props.author;
            return (
                <div className="banner">
                    <div onClick={this.showForm}className="editButton">Edit Profile<i className="fas fa-pencil-alt"></i></div>
                    <div className="bannerGrid">
                        <div className="userBanner">
                            <img src={userImage} alt={`${firstName}`} />
                            <div className="authorName">
                                <h2>{firstName} {lastName}</h2>
                                <p>Joined: {moment(new Date(createdAt)).format("MMMM Do, YYYY")}</p>
                            </div>
                        </div>
                        {bio ? <RenderBio bio={bio} /> : null}
                    </div>
                    {this.state.showForm ? this.renderForm() : null}
                </div>
            )
        }
    }
}

export default UserBanner;