import React, { Component } from 'react';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/Photo/Photo';
import Hero from '../../components/Hero/Hero';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';

export default class Home extends Component {
    state = {
        photos: [],
    }
    componentDidMount() {
        const url = "http://localhost:3000/photos"
        fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        this.setState({photos: data})
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
            <HomeHeader />
            <Hero />
            <CategoryHeader />
            <Photo photos={this.state.photos} />
            </Fade>
        )
    }
}
