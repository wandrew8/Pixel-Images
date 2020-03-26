import React, { Component } from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';

export default class Home extends Component {
    componentDidMount() {
        const url = "http://localhost:3000/photos"
        fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
            <HomeHeader />
                <h1>Home</h1>
            </div>
        )
    }
}
