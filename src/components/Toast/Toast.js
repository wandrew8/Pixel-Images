import React from 'react';
import './Toast.scss';

class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
        }
    }
    componentDidMount() {
        this.setState({ isShown: true })
        this.timer = setTimeout(() => {
            this.setState({ isShown: false })
        }, 3000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        if (this.state.isShown) {
            return(
                <div className="toast">
                    <h3>{this.props.message}</h3>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default Toast;