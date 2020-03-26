import React, { Component } from 'react';
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
        url: 'http://localhost:3000',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userImage: '',
        uploadImage: false,

        }
        
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({index: this.state.index >= this.state.images.length - 1 ? 0 : this.state.index + 1})
        }, 7000);
        
    };
    
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
    
    handleFormSubmit = async (event) => {
        event.preventDefault();
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userImage: this.state.userImage,
            password: this.state.password,
        }
        console.log(body)
        const url = this.state.url + '/users'
        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        
    };
    
    render() {
        const divStyle = {
            backgroundImage: 'url(' + this.state.images[this.state.index] + ')',
            transition: '2000ms ease-in',
          };
        const RenderImage = () => {
              return <img src={this.state.userImage} alt="" />
          };
        return (
            <div className="container" style={divStyle}> 
                <div className="overlay"></div>
                <div className="formContainer">
                    <form id="addPhotoForm">
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
                        <label htmlFor="email">Email Address:</label>
                        <input 
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                placeholder="Enter a valid email address..."
                                required
                            />
                        </div>
                        <div className="formGroup">
                        <label htmlFor="email">Password:</label>
                        <input 
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                placeholder="Create a password..."
                                required
                                minLength="8"
                                maxLength="20"
                            />
                        </div>
                        <div className="imageSample">
                            <button onClick={this.openWidget} type="button" className="addPhoto-button">{this.state.uploadImage ? <span>Image Uploaded</span> : "Upload Image"}</button>
                            <div className="imageSampleHolder">{this.state.uploadImage ? <RenderImage /> : ''}</div>
                        </div>
                        <div className="formGroup">
                            <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
