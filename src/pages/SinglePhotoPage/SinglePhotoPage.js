import React, { Component } from 'react';
import SinglePhoto from '../../components/SinglePhoto/SinglePhoto';
import { Fade } from 'react-animation-components';
import './SinglePhotoPage.scss';

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
            const url = "https://quiet-ravine-27369.herokuapp.com"

            fetch(url)
            .then(res => res.json())
            .then(data => {
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
