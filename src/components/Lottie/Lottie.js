import React from 'react';
import Lottie from 'lottie-react-web';
import './Lottie.scss';
import animation from '../../assets/images/heart.json';

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

