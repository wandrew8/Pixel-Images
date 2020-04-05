import React from 'react';
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
        if (this.state.togglePosted) {
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
                    <div onClick={this.togglePosted} className={this.state.togglePosted ? "toggleButton post highlight" : "toggleButton post"} >
                        POSTED PHOTOS
                    </div>
                    <div onClick={this.toggleFavorites} className={this.state.toggleLiked ? "toggleButton highlight" : "toggleButton post"}>
                        LIKED PHOTOS
                    </div>
                </div>
                {this.renderPhotos()}
            </React.Fragment>
        )
    }
}

export default ProfileToggle;