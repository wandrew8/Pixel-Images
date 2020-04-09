import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileToggle.scss';

class ProfileToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            togglePosted: true,
            toggleLiked: false,
            url: 'http://localhost:3000',
            data: {},
            photos: [],
            happy: true,
        }
    }

    togglePosted = () => {
        this.setState({ togglePosted: true, toggleLiked: false });
        this.props.togglePosted();
    };

    toggleFavorites = () => {
        this.setState({ togglePosted: false, toggleLiked: true });
        this.props.toggleFavorites();
    }

    renderPhotos = () => {
        if (this.props.toggle === 'posted') {
            return (
                <h1 className="heading">Your Posted Photos</h1>
            )
        } else {
            return (
                <h1 className="heading">Your Liked Photos</h1>
            )
        }
    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {
        return (
            <React.Fragment>
                <div className="toggle">
                    <Link to={`/profile/${this.props.author._id}/posted`} className={this.props.toggle === 'posted' ? "toggleButton post highlight" : "toggleButton post"} >
                        POSTED PHOTOS
                    </Link>
                    <Link to={`/profile/${this.props.author._id}/liked`} className={this.props.toggle === 'liked' ? "toggleButton highlight" : "toggleButton post"}>
                        LIKED PHOTOS
                    </Link>
                </div>
                {this.renderPhotos()}
            </React.Fragment>
        )
    }
}

export default ProfileToggle;