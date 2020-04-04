import React from 'react';
import './IndividualUser.scss';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/Photo/Photo';
import Hero from '../../components/Hero/Hero';
import UserBanner from '../../components/UserBanner/UserBanner';
import { render } from '@testing-library/react';

class IndividualUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'http://localhost:3000',
            data: {},
        }
        
    }
        componentDidMount() {
            this.getAuthorInfo(this.props.author)
        }
        getAuthorInfo = (id) => {
            const url = `${this.state.url}/users/${this.props.author}`
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            this.setState({data: data})
            console.log(this.state.data)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
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
                <UserBanner author={this.state.data} />
            </Fade>
        )
    }
}

export default IndividualUser;