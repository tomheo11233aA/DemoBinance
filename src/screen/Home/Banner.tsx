import Box from '@commom/Box'
import Img from '@commom/Img'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

type Event = {
    nativeEvent: {
        contentOffset: {
            x: number
        }
    }
}

const PADING_HOZ = 30
const PERCENT = 43.58974358974359
const HEIGHT_IMG = width * PERCENT / 100

const Banner = () => {
    const stepCarousel = useRef<any>(null)
    const [currentImage, setCurrentImage] = useState<number>(0)

    const images = [
        require('@images/home/banner1.png'),
        require('@images/home/banner2.png'),
        require('@images/home/banner3.png'),
    ]

    const handleScroll = (e: Event) => {
        if (!e) return
        const { nativeEvent } = e
        if (nativeEvent && nativeEvent.contentOffset) {
            let imageIndex: number = 0
            if (nativeEvent.contentOffset.x > 0) {
                imageIndex = (Math.floor(nativeEvent.contentOffset.x + width / 2) / width) - 0.4
            }
            setCurrentImage(Number(imageIndex.toFixed(0)))
        }
    }

    useEffect(() => {
        let index: number = 0
        const timeInterval = setInterval(() => {
            if (stepCarousel?.current?.scrollTo) {
                const w = width - PADING_HOZ
                stepCarousel.current.scrollTo({ x: index * w, y: 0, animated: true })
                index += 1
                if (index === images.length) index = 0
            }
        }, 3000)

        return () => clearInterval(timeInterval)
    }, [])

    return (
        <Box marginTop={10}>
            <ScrollView
                horizontal
                pagingEnabled
                ref={stepCarousel}
                onScroll={handleScroll}
                style={styles.scrollView}
                scrollEventThrottle={10000}
            >
                {images.map((image: string) =>
                    <Img
                        key={image}
                        source={image}
                        height={HEIGHT_IMG}
                        resizeMode={'stretch'}
                        width={width - PADING_HOZ}
                    />
                )}
            </ScrollView>
            <Box row alignSelf={'center'}>
                {images.map((image: string, index: number) =>
                    <Text
                        key={image}
                        style={currentImage == index ? styles.dotActive : styles.dot}
                    >
                        ●
                    </Text>
                )}
            </Box>
        </Box>
    )
}

export default Banner

const styles = StyleSheet.create({
    scrollView: {
        // width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    dotActive: {
        margin: 3,
        color: colors.yellow,
        fontSize: 10,
    },
    dot: {
        margin: 3,
        color: 'black',
        fontSize: 10,
        opacity: 0.5
    }
})