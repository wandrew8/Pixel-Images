import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Hero from '../../components/Hero/Hero';
import UserHeader from '../../components/UserHeader/UserHeader';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import './SinglePhotoPage.scss';


class SinglePhotoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            url: 'http://localhost:3000',
            photo: [],
        }
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
                    <CategoryHeader />
                    <SinglePhoto photo={this.props.photo} />
                </Fade>
            )
    }; 
}

export default SinglePhotoPage;
