import React, { Component } from 'react'

class Photo extends Component {
    constructor(props) {
    }
        render() {
            return (
                <div id={this.props._id} class="photo" >
                    <img alt={this.props.tags[0]}data-id={this.props._id} class="image" width="200" height="200" src={this.props.imageUrl} />
                    <div class="category">
                        <p>{this.props.category}</p>
                        <div class="likes"><p>{this.props.likes}</p><i class="far fa-heart"></i></div>
                    </div>
                    <div class="author">
                        <img alt="" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"/>
                        <p>{this.props.author}</p>
                    </div>
            </div>
        )
    }
};

export default Photo;
