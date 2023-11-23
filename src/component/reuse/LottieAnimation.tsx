import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

type Props = {
    source: string,
    size: number,
}

const LottieAnimation = ({ source, size = 100 }: Props) => {
    return (
        <AnimatedLottieView
            style={[
                size > 0 && { width: size }
            ]}
            resizeMode="contain"
            autoSize
            source={source}
            autoPlay
            loop
        />
    )
}

export default LottieAnimation