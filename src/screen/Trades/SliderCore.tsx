import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { coreFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React, { useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Note from './Note'

interface Props {
    setShow: Function;
}

const MAX = 125
const arrIndex = [1, 25, 50, 75, 100, 125]

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const SliderCore = ({ setShow }: Props) => {
    const theme = useTheme()
    const widthSlider = width - 45
    const onePercent = widthSlider * 1 / 100
    const translateX = useSharedValue<number | string>(onePercent)

    const dispatch = useAppDispatch()
    const core = useAppSelector(coreFuturesSelector)

    useEffect((): any => {
        const percent = core * 100 / MAX
        translateX.value = widthSlider * percent / 100
    }, [])

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startX = translateX.value
        },
        onActive: (e, ctx) => {
            const position = ctx.startX + e.translationX
            const percent = position * MAX / widthSlider

            if (percent > MAX) {
                translateX.value = widthSlider
            } else if (percent <= 1) {
                translateX.value = onePercent
            } else {
                translateX.value = position
            }
        },
    })

    const pointAnimtedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: Number(translateX.value) }],
    }))

    const barAnimatedStyle = useAnimatedStyle(() => ({
        width: translateX.value
    }))

    const textProps: any = useAnimatedProps(() => {
        const percent = Number(translateX.value) * 100 / widthSlider
        const value = MAX * percent / 100

        return {
            text: `${value.toFixed(0)}x`
        }
    })

    const handleChangeTextCore = (txt: string) => {
        let core = Number(txt.replace('x', '')) * (widthSlider / MAX)
        translateX.value = core
    }

    return (
        <Box>
            <Box
                row
                alignCenter
                justifySpaceBetween
                paddingHorizontal={10}
                height={45}
                marginVertical={5}
                backgroundColor={theme.gray2}
            >
                <Btn
                    onPress={() => {
                        let core: any = (Number(translateX.value) * MAX / widthSlider).toFixed(0)
                        if (core > 1) {
                            core = core - 1
                            core = core * (widthSlider / MAX)
                            translateX.value = core
                        }
                    }}
                >
                    <Txt style={styles.txt}>-</Txt>
                </Btn>

                <Box height={30} flex={1}>
                    <AnimatedTextInput
                        onChangeText={(txt: string) => handleChangeTextCore(txt)}
                        style={[styles.input, { color: theme.black }]}
                        defaultValue={'1x'}
                        placeholderTextColor={colors.grayBlue}
                        keyboardType={'number-pad'}
                        animatedProps={textProps}
                    />
                </Box>

                <Btn
                    onPress={() => {
                        let core: number = Number((Number(translateX.value) * MAX / widthSlider).toFixed(0))
                        if (core < MAX) {
                            core = core + 1
                            core = core * (widthSlider / MAX)
                            translateX.value = core
                        }
                    }}
                >
                    <Txt style={styles.txt}>+</Txt>
                </Btn>
            </Box>

            <Box alignCenter marginBottom={30} marginTop={30}>
                <View style={{ width: widthSlider, height: 3, backgroundColor: theme.gray }} />

                <Animated.View style={[styles.bar, { backgroundColor: theme.grayBlue }, barAnimatedStyle]} />

                <View style={{ flexDirection: 'row', width: widthSlider, position: 'absolute', marginTop: -3 }}>
                    {arrIndex.map((item, index) => {
                        const x_point = widthSlider / (arrIndex.length - 1) * index - 5

                        return (
                            <View key={item} style={{ position: 'absolute', left: x_point }}>
                                <Animated.View
                                    style={[styles.point,
                                    useAnimatedStyle(() => {
                                        const percent = (Number(translateX.value) * MAX / widthSlider).toFixed(0)
                                        let backgroundColor = Number(percent) >= item ? theme.grayBlue : theme.bg
                                        let borderColor = Number(percent) >= item ? theme.bg : theme.gray
                                        return ({
                                            backgroundColor,
                                            borderColor,
                                        })
                                    })
                                    ]}
                                />
                                <Text style={styles.textPoint}>{item + ' X'}</Text>
                            </View>
                        )
                    })}
                </View>

                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View style={[styles.circleAnim, pointAnimtedStyle]}>
                        <Animated.View style={[
                            styles.circle,
                            {
                                borderColor: theme.bg,
                                backgroundColor: theme.grayBlue,
                            }
                        ]}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </Box>

            <Note text={'Maximum position size at current leverage: 50,000 USDT'} />
            <Note text={'You can only increase leverage when holding a position, please be aware of the effect on the position you hold.'} />
            <Note text={'Please note that the leverage change will also apply to positions.'} />

            <Box row paddingRight={10} marginTop={10}>
                <Icon
                    source={require('@images/future/info.png')}
                    size={15}
                    tintColor={colors.redCan}
                    marginTop={2}
                    marginRight={5}
                />
                <Txt color={colors.red2}>
                    Choosing higher leverage, such as[10x] increases the risk of liquidation. Always manage your risk. See our help article for more information.
                </Txt>
            </Box>

            <Btn
                onPress={() => {
                    const percent = Number(translateX.value) * 100 / widthSlider
                    const core = MAX * percent / 100
                    dispatch(futuresSlice.actions.setCore(
                        Number(core?.toFixed(0))
                    ))
                    setShow(false)
                }}
                backgroundColor={colors.yellow}
                height={35}
                marginTop={20}
                radius={5}
            >
                <Txt fontFamily={fonts.SGM}>Confirm</Txt>
            </Btn>
        </Box>
    )
}

export default SliderCore

const styles = StyleSheet.create({
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
        transform: [
            { rotateZ: '45deg' },
        ],
    },
    input: {
        height: Platform.OS === 'ios' ? 30 : 40,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        textAlign: 'center',
        fontFamily: fonts.AS,
        fontSize: 16,
    },
    txt: {
        fontSize: 30,
        color: colors.grayBlue,
    },
    bar: {
        height: 5,
        position: 'absolute',
        left: 0
    },
    point: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: colors.gray3,
        backgroundColor: colors.white,
        transform: [{ rotateZ: '45deg' }],
    },
    textPoint: {
        fontSize: 12,
        fontFamily: fonts.SGM,
        color: colors.grayBlue,
        marginLeft: -5,
    }
})