import React, { Component } from 'react';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/Photo/Photo';
import Hero from '../../components/Hero/Hero';
import UserHeader from '../../components/UserHeader/UserHeader';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';

export default class Home extends Component {
    state = {
        photos: [],
        updatePhotos: false,
    }
    componentDidMount() {
        this.getPhotos();
    }

    componentDidUpdate() {
        if(this.state.updatePhotos) {
            this.getPhotos();
            this.setState({updatePhotos: false});
            console.log('Hit')
        }
    }

    updatePhotos = () => {
        this.setState({updatePhotos: true})
    }

    getPhotos = () => {
        const url = "http://localhost:3000/photos"
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({photos: data, updatePhotos: false})
        })
        .catch(err => console.log(err))
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
            <CategoryHeader />
            <Photo updatePhotos={this.updatePhotos} photos={this.state.photos} />
            </Fade>
        )
    }
}
