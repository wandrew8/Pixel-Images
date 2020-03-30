import React, { Component } from 'react';
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
            <div>
            <HomeHeader />
            <Hero />
            <CategoryHeader />
            <Photo photos={this.state.photos} />
            </div>
        )
    }
}
