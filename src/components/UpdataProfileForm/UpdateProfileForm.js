import React from 'react';
import './UpdateProfileForm.scss';

class UpdateProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.author.firstName,
            lastName: this.props.author.lastName,
            bio: this.props.author.bio,
            userImage: this.props.author.userImage,
            updatedPhoto: false,
            url: "https://quiet-ravine-27369.herokuapp.com"
        }
    }

    openWidget = event => {
        event.preventDefault();
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: "dcokaa0ia",
            uploadPreset: 'pixelUser'
        }, (error, result) => {
            if (result.event === "success") {
                this.setState({
                    updatedPhoto: true,
                    userImage: result.info.url
                })
            }
        });
        myWidget.open();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bio: this.state.bio,
            userImage: this.state.userImage,
        }
        console.log(body)
        const url = this.state.url + '/users/' + this.props.author._id
        fetch(url, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body),
            })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
                this.props.closeForm()
                this.props.updateAuthorInfo(body)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const renderImage = (url) => {
            return <img src={url} alt="" />
        };
        return (
            <React.Fragment>
                <div onClick={this.props.closeForm} className="closeBar"><i className="far fa-times-circle"></i></div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Update Profile</h2>
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
                        <label htmlFor="bio">Biography:</label>
                        <textarea
                            type="text"
                            id="bio"
                            name="bio"
                            maxLength="500"
                            value={this.state.bio}
                            onChange={this.handleInputChange}
                            className="textarea"
                            placeholder="Share some info about yourself (500 characters or less)..."
                        />
                        </div>

                    <div className="imageSample">
                        <button onClick={this.openWidget} type="button" className="addPhoto-button">{this.state.uploadImage ? <span>Image Uploaded</span> : "Upload User Image"}</button>
                        <div className="imageSampleHolder">{this.state.updatedPhoto ? renderImage(this.state.userImage) : renderImage(this.props.author.userImage)}</div>
                    </div>
                    <div className="formGroup">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default UpdateProfileForm;