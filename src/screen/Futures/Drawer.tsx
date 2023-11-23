import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@theme/colors'
import { height, width } from '@util/responsive'
import { styles as styled } from '@navigation/Container'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import DrawerContent from './DrawerContent'

const MAX = 0

const Drawer = forwardRef((_, ref) => {
    const theme = useTheme()
    const navigation = useNavigation()
    const left = useSharedValue(-width)
    const leftFore = useSharedValue(-width)

    const animationStyle = useAnimatedStyle(() => {
        return {
            left: left.value
        }
    })

    const animationForeStyle = useAnimatedStyle(() => {
        return {
            left: leftFore.value
        }
    })

    const close = useCallback(() => {
        'worklet'
        left.value = withSpring(-width, {
            damping: 100,
            stiffness: 400,
        }, () => {
            leftFore.value = -width
        })
        navigation.getParent()?.setOptions({
            tabBarStyle: [
                styled.container,
                { backgroundColor: theme.bg }
            ]
        })
    }, [])

    const slide = useCallback(() => {
        'worklet'
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
        leftFore.value = MAX
        left.value = withSpring(MAX, {
            damping: 100,
            stiffness: 400,
        })
    }, [])

    useImperativeHandle(
        ref,
        () => ({
            slide,
        }),
        [slide]
    )

    return (
        <Animated.View
            style={[styles.container, animationForeStyle]}
        >
            <Pressable
                onPress={close}
            >
                <Box
                    width={width}
                    height={height}
                    backgroundColor={colors.black}
                    opacity={0.3}
                    absolute
                />
            </Pressable>

            <Animated.View
                style={[styles.main, animationStyle]}
            >
                <DrawerContent close={close} />
            </Animated.View>
        </Animated.View>
    )
})

export default Drawer

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width,
        height: height,
    },
    main: {
        width: width * 85 / 100,
        height: height,
    }
})