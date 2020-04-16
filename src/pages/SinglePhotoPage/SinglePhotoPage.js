import React, { Component } from 'react';
import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';
import { Fade } from 'react-animation-components';
import './SinglePhotoPage.scss';
// import Photo from '../../components/Photo/Photo';
// import HomeHeader from '../../components/HomeHeader/HomeHeader';
// import Hero from '../../components/Hero/Hero';
// import UserHeader from '../../components/UserHeader/UserHeader';
// import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';


class SinglePhotoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            updatePhotos: false,
        }
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
            // const url = "http://localhost:3000/photos"
            const url = "https://quiet-ravine-27369.herokuapp.com"

            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({photos: data, updatePhotos: false})
            })
            .catch(err => console.log(err))
        }

    render() {
    
            return(
                <Fade
                    in
                    delay={0} 
                    exitOpacity={0.1}
                    timingFn='ease-in-out' 
                    duration={100}>
                    <SinglePhoto updatePhotos={this.updatePhotos}  photo={this.props.photo} />
                    <div className="background"></div>
                    <div className="backgroundOverlay"></div>

                </Fade>
            )
    }; 
}

export default SinglePhotoPage;
