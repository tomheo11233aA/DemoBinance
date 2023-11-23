import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { USDTFuturesSelector, amountFuturesSelector, currencyFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Animated, { SharedValue, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'
import { WIDTH_SLIDE } from './Slider'

interface Props {
    max: number;
    hint: SharedValue<Boolean>;
    enter: SharedValue<boolean>;
    textSize: SharedValue<number>;
    textFont: SharedValue<string>;
    positionX: SharedValue<number>;
}

const TextInputAnimation = Animated.createAnimatedComponent(TextInput)
export const PERCENT_90 = 90

const Amount = ({
    max,
    hint,
    enter,
    textSize,
    textFont,
    positionX,
}: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const USDT = useAppSelector(USDTFuturesSelector)
    const amount = useAppSelector(amountFuturesSelector)
    const currency = useAppSelector(currencyFuturesSelector)

    const animatedProps: any = useAnimatedProps(() => {
        if (enter.value) {
            return {
                text: `${amount}`
            }
        } else {
            const percent = positionX.value * 100 / WIDTH_SLIDE
            const amount = max * percent / 100

            return {
                text: hint.value ? '' : `${amount}`
            }
        }
    })

    const textStyle = useAnimatedStyle(() => {
        return {
            fontSize: textSize.value,
            fontFamily: textFont.value,
        }
    })

    return (
        <Box>
            <Box row>
                <Btn
                    flex={1}
                    height={25}
                    alignCenter
                    justifyCenter
                    marginRight={2}
                    backgroundColor={theme.gray2}
                    onPress={() => dispatch(futuresSlice.actions.setUSDT(false))}
                >
                    <Txt
                        size={12}
                        fontFamily={fonts.SGM}
                        color={USDT ? colors.grayBlue : theme.black}
                    >
                        {currency}
                    </Txt>
                </Btn>

                <Btn
                    flex={1}
                    height={25}
                    alignCenter
                    justifyCenter
                    backgroundColor={theme.gray2}
                    onPress={() => dispatch(futuresSlice.actions.setUSDT(true))}
                >
                    <Txt
                        size={12}
                        fontFamily={fonts.SGM}
                        color={USDT ? theme.black : colors.grayBlue}
                    >
                        USDT
                    </Txt>
                </Btn>
            </Box>

            <Box
                row
                height={45}
                alignCenter
                marginVertical={2}
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Btn
                    onPress={() => {
                        if (Number(amount) > 0) {
                            enter.value = true
                            const newAmount = Number(amount) - 1
                            const percent = newAmount * 100 / max
                            positionX.value = WIDTH_SLIDE * percent / 100
                            positionX.value = Math.max(positionX.value, 0)
                            dispatch(futuresSlice.actions.setAmount(newAmount))
                        }
                    }}
                >
                    <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
                </Btn>

                <Box flex={1} height={30}>
                    <TextInputAnimation
                        onChangeText={(txt: string) => {
                            if (txt === '') {
                                hint.value = true
                                textSize.value = 15
                                textFont.value = fonts.RM
                                positionX.value = 0
                            } else {
                                const percent = Number(txt) * 100 / max
                                positionX.value = Math.min(WIDTH_SLIDE * percent / 100, WIDTH_SLIDE)
                            }
                            enter.value = true
                            dispatch(futuresSlice.actions.setAmount(txt))
                        }}
                        placeholder={'Amount'}
                        keyboardType={'numeric'}
                        animatedProps={animatedProps}
                        selectionColor={colors.yellow}
                        placeholderTextColor={colors.grayBlue}
                        style={
                            [{
                                height: '100%',
                                textAlign: 'center',
                                color: theme.black,
                            }, textStyle, styles.input]
                        }
                    />
                </Box>

                <Btn
                    onPress={() => {
                        enter.value = true
                        const newAmount = Number(amount) + 1
                        const percent = newAmount * 100 / max
                        positionX.value = WIDTH_SLIDE * percent / 100
                        positionX.value = Math.min(positionX.value, WIDTH_SLIDE)
                        dispatch(futuresSlice.actions.setAmount(newAmount))
                    }}
                >
                    <Txt style={styles.txt}>+</Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default Amount

const styles = StyleSheet.create({
    input: {
        height: Platform.OS === 'ios' ? 30 : 40,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    txt: {
        fontSize: 30,
        color: colors.grayBlue,
    }
})