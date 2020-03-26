import React from 'react';
import './ErrorPage.scss';

export default function ErrorPage() {
    return (
        <div class="errorPage">
            <div class="overlay"></div>
            <img src="https://images.unsplash.com/photo-1563305123-1548e19a200e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80" />
            <div class="message">
                <h1>401:</h1><h1>UNAUTHORIZED</h1>
                <p>ACCESS IS ALLOWED ONLY FOR REGISTERED USERS</p>
            </div>
            
        </div>
    )
}
