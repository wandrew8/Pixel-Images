import React from 'react';
import Toast from '../Toast/Toast';
import './UpdatePhotoForm.scss';

class UpdatePhotoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.photo.category,
            tags: this.props.photo.tags,
            description: this.props.photo.description,
            url: 'https://quiet-ravine-27369.herokuapp.com',
            tag: '',
            success: false,
        };
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    change = event => {
        this.setState({category: event.target.value});
    }

    updateTags = event => {
        event.preventDefault();
        this.setState({tags: [...this.state.tags, this.state.tag]})
        this.setState({tag: ''});
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const photo = {
            category: this.state.category,
            tags: this.state.tags,
            description: this.state.description,
        }
        const token = window.sessionStorage.getItem('token');
        const url = this.state.url + '/photos/' + this.props.photo._id + '/update';
        fetch(url, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(photo),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            this.props.handleClose();
            this.setState({
                success: true
            });
        
    };
    removeItem = event => {
        const value = event.target.textContent;
        const index = this.state.tags.indexOf(value);
        this.setState({tags: this.state.tags.slice(0, index).concat(this.state.tags.slice(index + 1, this.state.tags.length))});
    }
    
    render() {
        
        const RenderTags = () => {
            const tags = this.state.tags.map(tag => {
                return (<p onClick={this.removeItem} key={tag} className="smallTag">{tag}</p>);
            })
            return tags;
        
        }
            return (
                <React.Fragment>
                    {this.state.success ? <Toast message="Image Successfully Updated" /> : null}
                    <div className="formModal updatePhotoModal">
                        <form onSubmit={this.handleFormSubmit}>
                            <h2>UPDATE YOUR PHOTO</h2>
                            <div onClick={this.props.handleClose} className="closeModal"><i className="far fa-times-circle"></i></div>
                            <div className="imageSample">
                                <div className="formGroup img">
                                    <img src={this.props.photo.imageUrl} alt={this.props.photo.tags[0]} />
                                </div>
                            </div>
                            <div className="formGroup">
                            <label htmlFor="updateCategory">Category</label>
                            <select 
                                onChange={this.change}
                                value={this.state.category}
                                required 
                                name="category"
                                id="updateCategory">
                                <option value="">Select a category...</option>
                                <option value="architecture">Architecture</option>
                                <option value="animals">Animals</option>
                                <option value="nature">Nature</option>
                                <option value="aerial">Aerial</option>
                                <option value="food">Food</option>
                                <option value="portrait">Portrait</option>
                                <option value="fashion">Fashion</option>
                                <option value="activity">Activity</option>
                                <option value="art">Art</option>
                            </select>
                            </div>
                            <div className="formGroup">
                            <label htmlFor="description">Description</label>
                                <textarea 
                                    rows="4" 
                                    placeholder="Describe your picture..."
                                    cols="50" 
                                    name="description" 
                                    id="description" 
                                    onChange={this.handleInputChange} 
                                    value={this.state.description} />
                            </div>
                            <div className="formGroup">
                            <label htmlFor="tags">Remove or add more tags</label>
                            <div className="row">
                                <input 
                                    value={this.state.tag}
                                    onChange={this.handleInputChange}
                                    name="tag"
                                    placeholder="Type a tag name and press enter"
                                    id="tagInput" />
                                <button disabled={this.state.tag ? false : true} onClick={this.updateTags} id="addTagButton"><i className="fas fa-plus"></i></button>
                            </div>
                            <div className="tagAnswers"><RenderTags /></div>
                            </div>
                            <div className="formGroup">
                            <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
    )
    }
}

export default UpdatePhotoForm;