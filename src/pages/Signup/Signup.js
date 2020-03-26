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
                "https://images.unsplash.com/photo-1518775804899-fa139ff3439e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3934&q=80"
        ],
        index: 0,
        url: 'http://localhost:3000/',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        userImage: '',
        }
        
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({index: this.state.index >= this.state.images.length - 1 ? 0 : this.state.index + 1})
        }, 7000);
        
    }
    openWidget = event => {
        event.preventDefault();
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: "dcokaa0ia",
            uploadPreset: 'pixelUsers'
        }, (error, result) => {
            if (result.event === "success") {
                this.setState({
                    uploadImage: true,
                    imageURL: result.info.url
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
    
    handleFormSubmit = event => {
        event.preventDefault();
        axios.post(this.state.url + "/api/createMenu", {
            dish: this.state.dish,
            quantity: this.state.quantity,
            servingUnit: this.state.servingUnit,
            price: this.state.price,
            ingredients: this.state.ingredients,
            cuisine: this.state.cuisine,
            UserId: this.state.loggedInUser.id,
            description: this.state.description,
            imageURL: this.state.imageURL
        })
            .then(function (results) {
                sessionVariable.readSessions();
                sessionVariable.setState({ uploadImage: false })
                sessionVariable.setState({ dish: '', quantity: '', servingUnit: '', price: '', ingredients: '', cuisine: '', description: '' })
            }).catch(function (error) {
                console.log(error);
            });
    };
    
    render() {
        const divStyle = {
            backgroundImage: 'url(' + this.state.images[this.state.index] + ')',
            transition: '1500ms ease-in',
          };
        return (

            <div className="container" style={divStyle}> 
                <div className="overlay"></div>
                <div className="formContainer">
                    <form id="addPhotoForm">
                        <h2>ADD YOUR OWN PHOTO</h2>
                        <div className="closeModal"><i className="far fa-times-circle"></i></div>
                        <div className="formGroup">
                        <label htmlFor="author">What is your name?</label>
                        <input
                            type="text"
                            id="author"
                            placeholder="Enter your name..."
                            required
                        />
                        </div>
                        <div className="formGroup">
                        <label htmlFor="category">Category</label>
                        <select required id="category">
                            <option value="landscape">Select a category...</option>
                            <option value="landscape">Landscape</option>
                            <option value="architecture">Architecture</option>
                            <option value="wildlife">Wildlife</option>
                            <option value="nature">Nature</option>
                            <option value="aerial">Aerial</option>
                            <option value="portrait">Portrait</option>
                            <option value="fashion">Fashion</option>
                            <option value="sports">Sports</option>
                            <option value="art">Art</option>
                        </select>
                        </div>
                        <div className="formGroup">
                        <label htmlFor="tags">Add some tags to describe your image</label>
                        <div className="row">
                            <input list="tags" id="tagInput" />
                            <datalist id="tags">
                            <option value="mountain"> </option>
                            <option value="food"> </option>
                            <option value="yoga"> </option>
                            <option value="dogs"> </option>
                            <option value="sunrise"> </option>
                            <option value="travel"> </option>
                            <option value="dinner"> </option>
                            <option value="city"> </option>
                            <option value="modern"> </option>
                            <option value="blue"> </option>
                            <option value="football"> </option>
                            <option value="garden"> </option>
                            <option value="animals"> </option>
                            </datalist>
                            <button id="addTagButton"><i className="fas fa-plus"></i></button>
                        </div>
                        <div className="tagAnswers"></div>
                        </div>
                        <div className="imageSample">
                        <button onClick={this.openWidget} type="button" className="addPhoto-button">{this.state.uploadImage ? <span>Success<i class="fas fa-check-circle fa-lg ml-2"></i></span> : "Upload Image"}</button>
                        <div className="imageSampleHolder"></div>
                        </div>
                        <div className="formGroup">
                        <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
