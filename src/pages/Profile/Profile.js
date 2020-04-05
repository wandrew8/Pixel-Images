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
        }
        
    }
    componentDidMount() {
        this.getAuthorInfo(this.props.author);
        this.getAuthorPhotos(this.props.author)
    }

    getAuthorInfo = (id) => {
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
                <ProfileToggle author={this.state.data} />
                <PhotoEdit reRenderPhotos={this.reRenderPhotos} photos={this.state.photos} />
            </Fade>
        )
    }
}

export default Profile;