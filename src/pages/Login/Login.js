import React, { Component } from 'react';
import { Fade } from 'react-animation-components';
import './Login.scss';

export default class Login extends Component {
    render() {
        return (
            <Fade in>
                <h1>Login</h1>
            </Fade>
        )
    }
}
