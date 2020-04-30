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
            liked: false,
            isLoading: false, 
            update: false,
            page: "posted"
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
        if(this.state.page === "posted" && this.state.page !== prevProps.page && this.state.update) {
            this.getAuthorPhotos();
        }
        if(this.state.page === "liked" && this.state.page !== prevProps.page && this.state.update) {
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
        this.setState({isLoading: true, update: false, liked: true })
        const userId = window.sessionStorage.getItem('authorId');
        const url = `${this.state.url}/users/${userId}/favorites`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Collected liked photos no problem");
            console.log(data)
            this.setState({ photos: data, isLoading: false, liked: false });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    getAuthorPhotos = () => {
        this.setState({isLoading: true, update: false })
        const url = `${this.state.url}/photos/author/${this.props.author}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({ photos: data, isLoading: false });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    toggle = (pageLink) => {
        this.setState({ page: pageLink, update: true })
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
                {token && authorId ?  <UserHeader updateAuthorPhotos={this.updateAuthorPhotos} /> : <HomeHeader updatePhotos={this.updatePhotos} />}
                <Hero />
                <ProfileBanner author={this.state.data} />
                <ProfileToggle author={this.state.data} page={this.state.page} toggle={this.toggle} />
                {this.state.isLoading ? <Loader /> : <Photo 
                                getLikedPhotos={this.getLikedPhotos} 
                                getAuthorPhotos={this.getAuthorPhotos} 
                                profile={true} 
                                updateAuthorPhotos={this.updateAuthorPhotos}
                                page={this.state.page} 
                                photos={this.state.photos} 
                />}
                
            </Fade>
        )
    }
}

export default Profile;