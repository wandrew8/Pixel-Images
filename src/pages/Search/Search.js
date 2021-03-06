import React from 'react';
import { Fade } from 'react-animation-components';
import UserHeader from '../../components/UserHeader/UserHeader';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Photo from '../../components/PhotoComponent/PhotoComponent';
import Loader from '../../components/Loader/Loader';
import CategoryHeader from '../../components/CategoryHeader/CategoryHeader';
import Hero from '../../components/Hero/Hero';
import './Search.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: "https://quiet-ravine-27369.herokuapp.com",
            photos: [],
        }
    }
    componentWillMount() {
        console.log(this.props.location)
        this.searchQuery()
    }

    componentDidUpdate(prevProps) {
        if(this.props.query !== prevProps.query) {
            this.searchQuery();
        }
    }

    searchQuery() {
        const url = `${this.state.url}/photos/search/${this.props.query}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.setState({photos: data})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }



    render() {
        const token = window.sessionStorage.getItem('token');
        const authorId = window.sessionStorage.getItem('authorId');

        return (
            <Fade
                in
                delay={0} 
                exitOpacity={0.1}
                timingFn='ease-in-out' 
                duration={300}>
                {token && authorId ?  <UserHeader updatePhotos={this.updatePhotos} /> : <HomeHeader updatePhotos={this.updatePhotos} />}
                <Hero />
                <CategoryHeader />
                {this.state.isLoading ? <Loader /> : <Photo photos={this.state.photos} />}
            </Fade>
        )
    }
}

export default Search;