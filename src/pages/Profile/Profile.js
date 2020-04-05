import React from 'react';
import { Fade } from 'react-animation-components';
import UserHeader from '../../components/UserHeader/UserHeader';
import PhotoEdit from '../../components/PhotoEdit/PhotoEdit';
import Hero from '../../components/Hero/Hero';
import UserBanner from '../../components/UserBanner/UserBanner';
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
        const {createdAt, favorites, firstName, lastName, userImage, userName} = this.state.data
        
        return(
            <Fade
                in
                delay={0} 
                exitOpacity={0.1}
                timingFn='ease-in-out' 
                duration={300}>
                <UserHeader />
                <Hero />
                <UserBanner author={this.state.data} />
                <PhotoEdit reRenderPhotos={this.reRenderPhotos} photos={this.state.photos} />
            </Fade>
        )
    }
}

export default Profile;