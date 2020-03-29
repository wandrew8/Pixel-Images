import React, { Component } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import Hero from '../../components/Hero/Hero';
import Photo from '../../components/Photo/Photo';

export default class User extends Component {
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
                <UserHeader />
                <Hero />
                <Photo photos={this.state.photos} />
            </div>
        )
    }
}
