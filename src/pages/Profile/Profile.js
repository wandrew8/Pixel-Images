import React from 'react';
import { Fade } from 'react-animation-components';
import UserHeader from '../../components/UserHeader/UserHeader';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import PhotoEdit from '../../components/PhotoEdit/PhotoEdit';
import Hero from '../../components/Hero/Hero';
import ProfileToggle from '../../components/ProfileToggle/ProfileToggle';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import './Profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:3000',
            data: {},
            photos: [],
            photoDeleted: false,
            showLiked: false,
            showPosted: true,
        }
        
    }
    componentDidMount() {
        this.getAuthorInfo();
        this.getAuthorPhotos()
    }

    componentDidUpdate() {
        if(this.state.showLiked) {
            this.getLikedPhotos();
        }
        if (this.state.showPosted) {
            this.getAuthorPhotos();
        }
    }

    getAuthorInfo = () => {
        const url = `${this.state.url}/users/${this.props.author}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({data: data})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } 

    getLikedPhotos = () => {
        const userId = window.sessionStorage.getItem('authorId');
        const url = `${this.state.url}/users/${userId}/favorites`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            this.setState({photos: data, photoDeleted: false, showLiked: false, showPosted: false})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    getAuthorPhotos = () => {
        const url = `${this.state.url}/photos/author/${this.props.author}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            this.setState({ photos: data, photoDeleted: false, showLiked: false, showPosted: false });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    togglePosted = () => {
        this.setState({ showLiked: false, showPosted: true });
    };

    toggleFavorites = () => {
        this.setState({ showLiked: true, showPosted: false });
    }

    reRenderPhotos = () => {
        this.getAuthorPhotos();
    }
    render() {     
        const token = window.sessionStorage.getItem('token');
        const authorId = window.sessionStorage.getItem('authorId');

        return(
            <Fade
                in
                delay={0} 
                exitOpacity={0.1}
                timingFn='ease-in-out' 
                duration={300}>
                {token && authorId ?  <UserHeader updatePhotos={this.updatePhotos} /> : <HomeHeader updatePhotos={this.updatePhotos} />}
                <Hero />
                <ProfileBanner author={this.state.data} />
                <ProfileToggle togglePosted={this.togglePosted} toggleFavorites={this.toggleFavorites} />
                <PhotoEdit reRenderPhotos={this.reRenderPhotos} photos={this.state.photos} />
            </Fade>
        )
    }
}

export default Profile;