import React from 'react';
import { Fade } from 'react-animation-components';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/Photo/Photo';
import Hero from '../../components/Hero/Hero';
import './Search.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: 'http://localhost:3000',
            photos: [],
        }
    }
    componentWillMount() {
        console.log(this.props.location)
        this.searchQuery()
    }

    componentDidUpdate() {
        this.searchQuery()
    }

    searchQuery() {
        const url = `${this.state.url}/photos/search/${this.props.query}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log('Success:', data);
        this.setState({photos: data})
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
                <Photo photos={this.state.photos} />
            </Fade>
        )
    }
}

export default Search;