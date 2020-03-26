import React, { Component } from 'react';
import './AddPhoto.scss';

export default class AddPhoto extends Component {
    render() {
        return (
            <div class="formModal">
              <form id="addPhotoForm">
                <h2>ADD YOUR OWN PHOTO</h2>
                <div class="closeModal"><i class="far fa-times-circle"></i></div>
                <div class="formGroup">
                    <label for="author">What is your name?</label>
                    <input
                    type="text"
                    id="author"
                    placeholder="Enter your name..."
                    required
                    />
                </div>
                <div class="formGroup">
                    <label for="category">Category</label>
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
                <div class="formGroup">
                    <label for="tags">Add some tags to describe your image</label>
                    <div class="row">
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
                    <button id="addTagButton"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="tagAnswers"></div>
                </div>
                <div class="imageSample">
                    <button id="upload_widget" class="addPhoto-button">
                    Upload Image
                    </button>
                    <div class="imageSampleHolder"></div>
                </div>
                <div class="formGroup">
                    <button type="submit">Submit</button>
                </div>
              </form>
          </div>
        )
    }
}
