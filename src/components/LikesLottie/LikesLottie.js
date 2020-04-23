import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/images/heart.json'
import './LikesLottie.scss';

export default class LikesLottie extends Component {
    constructor(props) {
        super(props)
        this.state = {isStopped: false, isPaused: false}

    }

    render() {
        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        
        const playOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
        };

        return (
            <div className="lottie">
                <Lottie
                    options={this.props.playLottie ? playOptions : defaultOptions}
                    height={500}
                    width={500}
                    >
                </Lottie>
            </div>
        )
    }
}
