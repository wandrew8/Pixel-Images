import React from 'react';
import { Fade } from 'react-animation-components';
import UserHeader from '../../components/UserHeader/UserHeader';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/PhotoComponent/PhotoComponent';
import Hero from '../../components/Hero/Hero';
import Loader from '../../components/Loader/Loader';
import ProfileToggle from '../../components/ProfileToggle/ProfileToggle';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import './Profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://quiet-ravine-27369.herokuapp.com",
            data: {},
            photos: [],
            photoDeleted: false,
            showLiked: false,
            showPosted: true,
            isLiked: false,
            isLoading: false, 
        }
        
    }
    componentDidMount() {
        this.getAuthorInfo();
        if(this.state.showPosted) {
            this.getAuthorPhotos();
        } 
        if (this.state.showLiked) {
            this.getLikedPhotos();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.toggle === "posted" && this.props.toggle !== prevProps.toggle) {
            this.getAuthorPhotos();
        }
        if(this.props.toggle === "liked" && this.props.toggle !== prevProps.toggle) {
            this.getLikedPhotos();
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
        this.setState({isLoading: true, showLiked: true, showPosted: false})
        const userId = window.sessionStorage.getItem('authorId');
        const url = `${this.state.url}/users/${userId}/favorites`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({isLiked: true, isLoading: false, photos: data, photoDeleted: false, showLiked: false, showPosted: false})
        })
        .catch((error) => {
            this.setState({isLiked: true, photos: [], photoDeleted: false, showLiked: false, showPosted: false})
            console.error('Error:', error);
        });
    }
    
    getAuthorPhotos = () => {
        const url = `${this.state.url}/photos/author/${this.props.author}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({isLiked: false, photos: data});
        })
        .catch((error) => {
            this.setState({isLiked: false, photos: [], photoDeleted: false, showLiked: false, showPosted: false})
            console.error('Error:', error);
        });
    }

    togglePosted = () => {
        this.setState({ showLiked: false, showPosted: true });
    };

    toggleFavorites = () => {
        this.setState({ showLiked: true, showPosted: false });
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
                <ProfileToggle author={this.state.data} toggle={this.props.toggle} />
                {this.state.isLoading ? <Loader /> : <Photo 
                                getLikedPhotos={this.getLikedPhotos} 
                                toggle={this.props.toggle} 
                                profile={true} 
                                reRenderPhotos={this.reRenderPhotos} 
                                getAuthorPhotos={this.getAuthorPhotos} 
                                isLiked={this.state.isLiked} 
                                photos={this.state.photos} />}
            </Fade>
        )
    }
}

export default Profile;