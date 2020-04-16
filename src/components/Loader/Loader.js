import React from 'react';
import './Loader.scss';

function Loader() {
    return (
        <div className="loader">
            <p>Loading...</p>
            <i className="fas fa-spin fa-circle-notch"></i>
        </div>
    )
}

export default Loader;