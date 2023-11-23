import Box from '@commom/Box'
import Img from '@commom/Img'
import { useTheme } from '@hooks/index'
import { styled } from '@theme/styled'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const ToastTop = forwardRef((_, ref) => {
    const theme = useTheme()
    const topStart = -80
    const topAnimation = useSharedValue(topStart)

    const opacityImageCheck = useSharedValue(0)
    const opacityImageRemove = useSharedValue(0)
    const opacityAnimated = useSharedValue(0)

    const messageToast = useSharedValue('')

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

    const animationStyle = useAnimatedStyle(() => {
        return {
            top: topAnimation.value,
            opacity: opacityAnimated.value,
        }
    })

    const slideDown = useCallback((text: string, status: boolean) => {
        'worklet'
        messageToast.value = text

        status ? [opacityImageCheck.value, opacityImageRemove.value] = [1, 0] :
            [opacityImageCheck.value, opacityImageRemove.value] = [0, 1]

        topAnimation.value = withSpring(50, {
            damping: 100,
            stiffness: 400,
        }, () => {
            topAnimation.value = withDelay(2000, withSpring(topStart))
        })

        opacityAnimated.value = withSpring(1, {
            damping: 100,
            stiffness: 400,
        }, () => {
            opacityAnimated.value = withDelay(3000, withSpring(0))
        })
    }, [])

    useImperativeHandle(
        ref,
        () => ({
            slideDown,
        }),
        [slideDown]
    )

    const maxLabelText: any = useAnimatedProps(() => {
        return {
            text: `${messageToast.value}`,
        }
    })

    const imgCheckAnimated = useAnimatedStyle(() => {
        return {
            opacity: opacityImageCheck.value
        }
    })

    const imgRemoveAnimated = useAnimatedStyle(() => {
        return {
            opacity: opacityImageRemove.value
        }
    })

    return (
        <Animated.View
            style={[
                styles.animated,
                { backgroundColor: theme.bg },
                animationStyle,
            ]}
        >
            <Box
                width={35}
                height={50}
                alignCenter
                justifyCenter
                marginRight={10}
            >
                <Animated.View
                    style={[styles.animatedImage, imgCheckAnimated]}
                >
                    <Img
                        source={require('@images/profile/check.png')}
                        width={35}
                        height={35}
                    />
                </Animated.View>
                <Animated.View
                    style={[styles.animatedImage, imgRemoveAnimated]}
                >
                    <Img
                        source={require('@images/profile/remove.png')}
                        width={35}
                        height={35}
                    />
                </Animated.View>
            </Box>

            <AnimatedTextInput
                style={[styles.labelText, { color: theme.black }]}
                defaultValue='0'
                animatedProps={maxLabelText}
                editable={false}
            />
        </Animated.View>
    )
})

export default ToastTop

const styles = StyleSheet.create({
    animated: {
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        ...styled.shadow,
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    animatedImage: {
        position: 'absolute',
    }
})