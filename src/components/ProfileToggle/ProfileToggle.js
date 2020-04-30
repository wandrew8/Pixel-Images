import React from 'react';
import './ProfileToggle.scss';

class ProfileToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://quiet-ravine-27369.herokuapp.com',
            data: {},
            photos: [],
        }
    }

    renderPhotos = () => {
        if (this.props.page === 'posted') {
            return (
                <h1 className="heading">Your Posted Photos</h1>
            )
        } else {
            return (
                <h1 className="heading">Your Liked Photos</h1>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="toggle">
                    <div onClick={this.props.toggle.bind(this, "posted")} className={this.props.page === 'posted' ? "toggleButton post highlight" : "toggleButton post"} >
                        POSTED PHOTOS
                    </div>
                    <div onClick={this.props.toggle.bind(this, "liked")} className={this.props.page === 'liked' ? "toggleButton highlight" : "toggleButton post"}>
                        LIKED PHOTOS
                    </div>
                </div>
                {this.renderPhotos()}
            </React.Fragment>
        )
    }
}

export default ProfileToggle;