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

    getAuthorPhotos = () => {
        const url = `${this.state.url}/photos/author/${this.props.author}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            this.setState({photos: data})
            console.log(this.state.data)
            this.setState({ photoDeleted: false });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="toggle">
                    <div onClick={() => this.setState({toggleLiked: false, togglePosted: true})} className={this.state.togglePosted ? "toggleButton post highlight" : "toggleButton post"} >
                        POSTED PHOTOS
                    </div>
                    <div onClick={() => this.setState({toggleLiked: true, togglePosted: false})} className={this.state.toggleLiked ? "toggleButton highlight" : "toggleButton post"}>
                        LIKED PHOTOS
                    </div>
                </div>
                {this.renderPhotos()}
            </React.Fragment>
        )
    }
}

export default ProfileToggle;