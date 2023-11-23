import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { amountSpotSelector, coinChoosedSpotSelector, totalAmountSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { setAmount, setTotalAmount } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Amount = ({ theme, t }: any) => {
    const dispatch = useAppDispatch()
    const amount = useAppSelector(amountSpotSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    const totalAmount = useAppSelector(totalAmountSpotSelector)

    return (
        <Box>
            {typeTrade === 'Market' &&
                <Box row>
                    <Btn
                        flex={1}
                        height={25}
                        alignCenter
                        justifyCenter
                        marginRight={2}
                        backgroundColor={theme.gray2}
                        onPress={() => dispatch(setTotalAmount('Amount'))}
                    >
                        <Txt
                            size={12}
                            fontFamily={fonts.SGM}
                            color={totalAmount === 'Amount' ? theme.black : colors.grayBlue}
                        >
                            {t('Amount')}
                        </Txt>
                    </Btn>

                    <Btn
                        onPress={() => dispatch(setTotalAmount('Total'))}
                        flex={1}
                        alignCenter
                        justifyCenter
                        height={25}
                        backgroundColor={theme.gray2}
                    >
                        <Txt
                            size={12}
                            fontFamily={fonts.SGM}
                            color={totalAmount === 'Total' ? theme.black : colors.grayBlue}
                        >
                            {t('Total')}
                        </Txt>
                    </Btn>
                </Box>
            }

            <Box
                row
                alignCenter
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
                height={45}
                marginVertical={2}
            >
                <Btn
                    onPress={() => {
                        const n = Number(amount) - 1
                        if (n >= 0) {
                            dispatch(setAmount(n))
                        }
                    }}
                >
                    <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
                </Btn>

                <Box flex={1} height={30}>
                    <TextInput
                        value={amount.toString()}
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                        placeholderTextColor={colors.grayBlue}
                        onChangeText={(text: string) => dispatch(setAmount(text))}
                        placeholder={
                            typeTrade === 'Limit' ? `${t('Amount')} (${coinChoosed.currency})`
                                : totalAmount === `${t('Amount')}` ? `(${coinChoosed.currency})` : `(USDT)`
                        }
                        style={[
                            styles.input, {
                                fontFamily: amount.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                                fontSize: amount.toString() === '' ? 15 : 18,
                                color: theme.black,
                            }
                        ]}
                    />
                </Box>

                <Btn
                    onPress={() => {
                        const n = Number(amount) + 1
                        dispatch(setAmount(n))
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
        fontFamily: fonts.SGM,
    },
    txt: {
        fontSize: 30,
        color: colors.grayBlue,
    }
})