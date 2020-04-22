import React from 'react';
import './IndividualUser.scss';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/PhotoComponent/PhotoComponent';
import Loader from '../../components/Loader/Loader';
import Hero from '../../components/Hero/Hero';
import UserHeader from '../../components/UserHeader/UserHeader';
import UserBanner from '../../components/UserBanner/UserBanner';

class IndividualUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // url: 'http://localhost:3000',
            url: "https://quiet-ravine-27369.herokuapp.com",
            data: {},
            photos: [],
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

        getAuthorPhotos = (id) => {
            const url = `${this.state.url}/photos/author/${this.props.author}`
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            this.setState({photos: data})
            console.log(this.state.data)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
        render() {
            const token = window.sessionStorage.getItem('token');
            const authorId = window.sessionStorage.getItem('authorId');
    
            return (
                <Fade
                    in
                    delay={0} 
                    exitOpacity={0.1}
                    timingFn='ease-in-out' 
                    duration={300}>
                    {token && authorId ?  <UserHeader updatePhotos={this.updatePhotos} /> : <HomeHeader updatePhotos={this.updatePhotos} />}
                    <Hero />
                    <UserBanner author={this.state.data} />
                    {this.state.isLoading ? <Loader /> :<Photo photos={this.state.photos} />}
                </Fade>
        )
    }
}

export default IndividualUser;