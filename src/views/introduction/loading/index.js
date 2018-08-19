import React from 'react';
import LottieView from 'lottie-react-native';

export class Loading extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView

                style={{backgroundColor: '#ffffff'}}

                ref={animation => (this.animation = animation)}

                source={require('./animation.json')}

                loop

                autoplay

            />
        )
    }
}
