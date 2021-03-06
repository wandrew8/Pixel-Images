import React, { Component } from 'react';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/PhotoComponent/PhotoComponent';
import Hero from '../../components/Hero/Hero';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import UserHeader from '../../components/UserHeader/UserHeader';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';

export default class Home extends Component {
    state = {
        photos: [],
        updatePhotos: false,
        isLoading: true,
        page: 0,
        url: "https://quiet-ravine-27369.herokuapp.com"
    }
    componentDidMount() {
        this.getPhotos();
    }

    componentDidUpdate() {
        if(this.state.updatePhotos) {
            this.getPhotos();
            this.setState({updatePhotos: false});
        }
    }

    updatePhotos = () => {
        this.setState({updatePhotos: true})
    }

    getPhotos = () => {
        const url = this.state.url + "/photos"
        fetch(url)
        .then(res => res.json())
        .then(data => {
            
            let photos = [];
            while(data.length) {
                photos.push(data.splice(0,25))
            }
            this.setState({photos: photos, isLoading: false, updatePhotos: false})
            console.log(this.state)
        })
        .catch(err => console.log(err))
    }

    nextPage = () => {
        if (this.state.page < this.state.photos.length) {
            this.setState({ page: this.state.page + 1 })
        } else {
            console.log('No more photos to display')
        }
    }

    prevPage = () => {
        if (this.state.page === 0) {
            console.log('You are on the first page')
        } else {
            this.setState({ page: this.state.page - 1 })
        }
    }

    render() {
        const length = this.state.photos.length;
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
                {this.state.isLoading ? <Loader /> : <Photo updatePhotos={this.updatePhotos} photos={this.state.photos[this.state.page]} />}
                {this.state.photos.length > 1 ? <Pagination prevPage={this.prevPage} nextPage={this.nextPage} length={length} page={this.state.page} /> : null}
            </Fade>
        )
    }
}
