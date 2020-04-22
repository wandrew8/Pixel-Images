import React from 'react';
import Lottie from 'lottie-react-web';
import animation from '../../assets/images/heart.json';
import './Lottie.scss';

function LottieComponent (props) {
    return (
            <div className="lottieContainer">
                <Lottie
                    direction={props.play ? 1 : -1}
                    options={{
                    loop: false,
                    animationData: animation
                    }}
                />
            </div>
        )
}
  

export default LottieComponent;

