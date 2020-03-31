import React, { Component } from 'react';
import { Fade } from 'react-animation-components';
import './Category.scss';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Hero from '../../components/Hero/Hero';
import Photo from '../../components/Photo/Photo';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';

export default class Category extends Component {
    state = {
        photos: [],
        updatePhotos: false,
    }

    componentDidMount() {
       this.fetchPhotos()
    }

    componentDidUpdate() {
        if(this.state.updatePhotos) {
            this.fetchPhotos();
        }
    }

    updatePhotos = () => {
        this.setState({updatePhotos: true})
    }

    fetchPhotos = () => {
        const url = `http://localhost:3000/photos/category/${this.props.category}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        this.setState({photos: data, updatePhotos: false})
    })
    .catch(err => console.log(err))
    }

    render() {
        return (
            <Fade
                in
                delay={0} 
                exitOpacity={0.1}
                timingFn='ease-in-out' 
                duration={300}>
                <HomeHeader updatePhotos={this.updatePhotos} />
                <Hero />
                <CategoryHeader updatePhotos={this.updatePhotos} />
                <Photo updatePhotos={this.updatePhotos} photos={this.state.photos} />
            </Fade>
        )
    }
}
