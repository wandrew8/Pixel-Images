import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Fade } from 'react-animation-components';
import logo from '../../assets/images/icons/android-chrome-512x512.png'
import './Signup.scss';


export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                "https://images.unsplash.com/photo-1584598173971-b7cc2b0a5ff3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80",
                "https://images.unsplash.com/photo-1575127051981-5fde99a29e1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3104&q=80",
                "https://images.unsplash.com/photo-1579033048983-75670547ce2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3800&q=80",
                "https://images.unsplash.com/photo-1526661309553-0b6c10fb4302?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2176&q=80"
            ],
        index: 0,
        url: "https://quiet-ravine-27369.herokuapp.com",
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        userImage: '',
        uploadImage: false,
        token: false,

        }
        
    }
    componentDidMount() {
        // Changes background images every seven seconds
        setInterval(() => {
            this.setState({index: this.state.index >= this.state.images.length - 1 ? 0 : this.state.index + 1})
        }, 7000);
        
    };

    componentWillUnmount() {
        clearInterval(() => {
            this.setState({index: this.state.index >= this.state.images.length - 1 ? 0 : this.state.index + 1})
        }, 7000);
    }
    
    openWidget = event => {
        event.preventDefault();
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: "dcokaa0ia",
            uploadPreset: 'pixelUser'
        }, (error, result) => {
            if (result.event === "success") {
                this.setState({
                    uploadImage: true,
                    userImage: result.info.url
                })
            }
        });
        myWidget.open();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    setSession = (token, authorId) => {
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('authorId', authorId);
        this.setState({ token: true });
    }
    
    handleFormSubmit = async (event) => {
        event.preventDefault();
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            userImage: this.state.uploadImage ? this.state.userImage : "https://res.cloudinary.com/dcokaa0ia/image/upload/v1587662103/pixelUser/qjwzgivfrr8sx6szynso.png",
            password: this.state.password,
        }
        console.log(body)
        const url = this.state.url + '/users/signup'
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body),
            })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            this.setState({
                firstName: '',
                lastName: '',
                username: '',
                userImage: '',
                password: '',
            });
            this.setSession(data.token, data.userId); 
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        
    };

    renderRedirect = () => {
        if (this.state.token) {
            return <Redirect to='/user' />
        }
    }
    
    render() {
        const divStyle = {
            backgroundImage: 'url(' + this.state.images[this.state.index] + ')',
            transition: '2000ms ease-in',
          };
        const RenderImage = () => {
              return <img src={this.state.userImage} alt="" />
          };
        return (
            <Fade
                in
                delay={0} 
                exitOpacity={0.1}
                timingFn='ease-in-out' 
                duration={300}>            
                <div className="container" style={divStyle}> 
                <div className="headerTop">
                    <div className="titleHeader">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                        <Link to="/">
                            <h1>Pixel Images</h1>
                        </Link>
                    </div>
                </div>
                <div className="redirect">
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
                <div className="overlay"></div>
                <div className="formContainer">
                    <form onSubmit={this.handleFormSubmit} id="addPhotoForm">
                        <h2>CREATE AN ACCOUNT</h2>
                        <div className="splitInputs">
                            <div className="formGroup">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                name="firstName"
                                id="firstName"
                                placeholder="First Name..."
                                required
                            />
                            </div>
                            <div className="formGroup">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                placeholder="Last Name..."
                                required
                            />
                            </div>
                        </div>
                        <div className="formGroup">
                        <label htmlFor="username">Create a username:</label>
                        <input 
                                type="text"
                                id="username"
                                name="username"
                                minLength="8"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                placeholder="Enter a username or email..."
                                required
                            />
                        </div>
                        <div className="formGroup">
                        <label htmlFor="password">Password:</label>
                        <input 
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                placeholder="Create a password (at least 8 characters)..."
                                required
                                minLength="8"
                                maxLength="20"
                            />
                        </div>
                        <div className="imageSample">
                            <button onClick={this.openWidget} type="button" className="addPhoto-button">{this.state.uploadImage ? <span>Image Uploaded</span> : "Upload User Image"}</button>
                            <div className="imageSampleHolder">{this.state.uploadImage ? <RenderImage /> : ''}</div>
                        </div>
                        <div className="formGroup">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                {this.renderRedirect()}
            </div>
        </Fade>
        )
    }
}
