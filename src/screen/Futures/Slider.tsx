import Box from '@commom/Box'
import Btn from '@commom/Btn'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { sliderListenFutureSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler'
import Animated, { SharedValue, runOnJS, useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'

interface Props {
    max: number;
    hint: SharedValue<boolean>;
    enter: SharedValue<boolean>;
    textSize: SharedValue<number>;
    textFont: SharedValue<string>;
    positionX: SharedValue<number>;
}

export const WIDTH_SLIDE = (width * 60 / 100) - 45

const Slider = ({
    max,
    hint,
    enter,
    textSize,
    textFont,
    positionX,
}: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const widthSlider = WIDTH_SLIDE
    const width3 = (widthSlider / 2) - 7
    const width2 = (width3 / 2)
    const width5 = widthSlider - 6
    const width4 = (width5 - width3) / 2 + width3

    const color2 = useSharedValue(theme.bg)
    const border2 = useSharedValue(theme.gray)
    const color3 = useSharedValue(theme.bg)
    const border3 = useSharedValue(theme.gray)
    const color4 = useSharedValue(theme.bg)
    const border4 = useSharedValue(theme.gray)
    const color5 = useSharedValue(theme.bg)
    const border5 = useSharedValue(theme.gray)
    const colorCursor = useSharedValue(theme.bg)
    const borderCursor = useSharedValue(colors.gray5)
    const scaleCuror = useSharedValue(0.8)
    const inputOpacity = useSharedValue(0)

    const sliderListen = useAppSelector(sliderListenFutureSelector)

    useEffect(() => {
        positionX.value = 0
    }, [sliderListen])

    useDerivedValue(() => {
        if (positionX.value > 0) {
            colorCursor.value = theme.grayBlue
            borderCursor.value = theme.bg
            scaleCuror.value = 1
        } else {
            colorCursor.value = theme.bg
            borderCursor.value = colors.gray5
            scaleCuror.value = 0.8
        }

        if (positionX.value >= width2) {
            color2.value = theme.grayBlue
            border2.value = theme.bg
        } else {
            color2.value = theme.bg
            border2.value = theme.gray
        }

        if (positionX.value >= (widthSlider / 2)) {
            color3.value = theme.grayBlue
            border3.value = theme.bg
        } else {
            color3.value = theme.bg
            border3.value = theme.gray
        }

        if (positionX.value >= width4) {
            color4.value = theme.grayBlue
            border4.value = theme.bg
        } else {
            color4.value = theme.bg
            border4.value = theme.gray
        }

        if (positionX.value >= width5) {
            color5.value = theme.grayBlue
            border5.value = theme.bg
        } else {
            color5.value = theme.bg
            border5.value = theme.gray
        }
    }, [])

    const setAmount = (amount: number) => {
        dispatch(futuresSlice.actions.setAmount(amount))
    }

    const gestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startX = positionX.value

            hint.value = false
            textSize.value = 18
            enter.value = false
            textFont.value = fonts.M20

            const percent = positionX.value * 100 / WIDTH_SLIDE
            const amount = max * percent / 100

            runOnJS(setAmount)(amount)
        },
        onActive: (e, ctx) => {
            const position = ctx.startX + e.translationX

            if (position > widthSlider) {
                positionX.value = widthSlider
            } else if (position < 0) {
                positionX.value = 0
            } else {
                positionX.value = position
            }

            inputOpacity.value = 1
        },
        onEnd(e, ctx) {
            inputOpacity.value = 0
            const percent = positionX.value * 100 / WIDTH_SLIDE
            const amount = max * percent / 100

            runOnJS(setAmount)(amount)
        },
    })

    const animCircle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }],
    }))

    const sliderAnim = useAnimatedStyle(() => ({
        width: positionX.value
    }))

    const slider2 = useAnimatedStyle(() => ({
        backgroundColor: color2.value,
        borderColor: border2.value
    }))

    const slider3 = useAnimatedStyle(() => ({
        backgroundColor: color3.value,
        borderColor: border3.value
    }))

    const slider4 = useAnimatedStyle(() => ({
        backgroundColor: color4.value,
        borderColor: border4.value
    }))

    const slider5 = useAnimatedStyle(() => ({
        backgroundColor: color5.value,
        borderColor: border5.value
    }))

    const cursor = useAnimatedStyle(() => ({
        backgroundColor: colorCursor.value,
        borderColor: borderCursor.value,
        transform: [{ scale: scaleCuror.value }, { rotate: '45deg' }]
    }))

    const inputAnim = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }],
        opacity: inputOpacity.value,
    }))

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    const textProps: any = useAnimatedProps(() => {
        return {
            text: `${(positionX.value * 100 / widthSlider).toFixed(0)}%`
        }
    })

    const setPercentAmount = (percent: number) => {
        positionX.value = WIDTH_SLIDE * percent / 100
        const amount = max * percent / 100

        hint.value = false
        textSize.value = 18
        enter.value = false
        textFont.value = fonts.M20
        
        setAmount(amount)
    }

    return (
        <Box alignCenter marginBottom={20} marginTop={20}>
            <Box width={'100%'}>
                <Animated.View style={[styles.label, inputAnim]}>
                    <AnimatedTextInput
                        style={styles.labelText}
                        defaultValue='0%'
                        animatedProps={textProps}
                        editable={false}
                    />
                </Animated.View>
            </Box>

            <Box height={8} width={widthSlider}>
                <Box width={widthSlider} height={'40%'} backgroundColor={theme.gray} />

                <Animated.View style={[styles.sliderChil, { backgroundColor: theme.grayBlue }, sliderAnim]} />

                <Box row width={widthSlider} absolute top={-2.8}>
                    <View
                        style={{
                            width: 10,
                            height: 10,
                            borderWidth: 2,
                            borderColor: theme.bg,
                            backgroundColor: theme.grayBlue,
                            marginLeft: -3,
                            transform: [{ rotateZ: '45deg' }]
                        }}
                    >
                        <Btn
                            flex={1}
                            style={{ transform: [{ scale: 2 }] }}
                            onPress={() => setPercentAmount(0)}
                        />
                    </View>

                    <Animated.View
                        style={[
                            styles.indexSlider,
                            { left: width2, borderColor: theme.gray, backgroundColor: theme.bg },
                            slider2,
                        ]}
                    >
                        <Btn
                            flex={1}
                            style={{ transform: [{ scale: 2 }] }}
                            onPress={() => setPercentAmount(25)}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.indexSlider,
                            { left: width3, borderColor: theme.gray, backgroundColor: theme.bg },
                            slider3,
                        ]}
                    >
                        <Btn
                            flex={1}
                            style={{ transform: [{ scale: 2 }] }}
                            onPress={() => setPercentAmount(50)}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.indexSlider,
                            { left: width4, borderColor: theme.gray, backgroundColor: theme.bg },
                            slider4,
                        ]}
                    >
                        <Btn
                            flex={1}
                            style={{ transform: [{ scale: 2 }] }}
                            onPress={() => setPercentAmount(75)}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.indexSlider,
                            { left: width5, borderColor: theme.gray, backgroundColor: theme.bg },
                            slider5,
                        ]}
                    >
                        <Btn
                            flex={1}
                            style={{ transform: [{ scale: 2 }] }}
                            onPress={() => setPercentAmount(100)}
                        />
                    </Animated.View>
                </Box>

                <PanGestureHandler onGestureEvent={gestureEvent}>
                    <Animated.View style={[styles.circleAnim, animCircle]}>
                        <Animated.View style={[styles.circle, cursor]} />
                    </Animated.View>
                </PanGestureHandler>
            </Box>
        </Box>
    )
}

export default Slider

const styles = StyleSheet.create({
    labelText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        fontFamily: fonts.OL,
        padding: 0, // not remove
    },
    label: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: colors.grayBlue,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 23,
        left: -15,
    },
    // label: {
    //     position: 'absolute',
    //     top: -40,
    //     left: 0,
    //     backgroundColor: colors.grayBlue,
    //     borderRadius: 5,
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // labelText: {
    //     color: 'white',
    //     padding: 5,
    //     fontWeight: 'bold',
    //     width: '100%',
    //     fontSize: 12,
    // },
    indexSlider: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderRadius: 3,
        transform: [{ rotateZ: '45deg' }],
        position: 'absolute',
    },
    sliderChil: {
        backgroundColor: colors.grayBlue,
        height: '60%',
        width: '10%',
        position: 'absolute',
    },
    circleAnim: {
        position: 'absolute',
        top: -6,
        left: -8,
    },
    circle: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: colors.gray5,
        transform: [
            { rotateZ: '45deg' },
            { scale: 0.8 }
        ],
    }
})