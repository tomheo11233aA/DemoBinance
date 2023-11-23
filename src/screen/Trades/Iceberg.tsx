import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { icebergAmountSpotSelector, icebergSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { setIceberg, setIcebergAmount } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet, Text, TextInput } from 'react-native'

const Iceberg = ({ theme, t }: any) => {
    const dispatch = useAppDispatch()
    const iceberg = useAppSelector(icebergSpotSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)
    const icebergAmount = useAppSelector(icebergAmountSpotSelector)

    return (
        <Box>
            {typeTrade === 'Limit' &&
                <>
                    <Btn
                        row
                        alignEnd
                        marginTop={10}
                        marginBottom={2}
                        alignSelf={'flex-start'}
                        onPress={() => dispatch(setIceberg(!iceberg))}
                    >
                        {iceberg ?
                            <Box
                                width={12}
                                height={12}
                                radius={50}
                                borderColor={theme.gray6}
                                marginRight={7}
                                alignCenter
                                justifyCenter
                                backgroundColor={colors.yellow}
                            >
                                <Txt size={10} color={colors.white}>✓</Txt>
                            </Box>
                            :
                            <Box
                                width={12}
                                height={12}
                                backgroundColor={theme.gray3}
                                radius={50}
                                borderWidth={1}
                                borderColor={theme.gray6}
                                marginRight={7}
                            />
                        }

                        <Text
                            style={{
                                color: theme.black,
                                textDecorationLine: 'underline',
                                fontFamily: fonts.IBMPR,
                                fontSize: 12,
                            }}
                        >
                            {t('Iceberg')}
                        </Text>
                    </Btn>

                    {iceberg &&
                        <Box
                            row
                            alignCenter
                            justifySpaceBetween
                            paddingHorizontal={10}
                            backgroundColor={theme.gray2}
                            height={45}
                            marginVertical={5}
                        >
                            <Btn
                                onPress={() => {
                                    const n = Number(icebergAmount) - 1
                                    if (n >= 0) {
                                        dispatch(setIcebergAmount(n))
                                    }
                                }}
                            >
                                <Txt size={20} bold color={colors.grayBlue}>
                                    ー
                                </Txt>
                            </Btn>

                            <Box flex={1} height={30}>
                                <TextInput
                                    keyboardType={'decimal-pad'}
                                    placeholder={t('Iceberg Amount')}
                                    selectionColor={colors.yellow}
                                    value={icebergAmount.toString()}
                                    placeholderTextColor={colors.grayBlue}
                                    onChangeText={(text: string) => dispatch(setIcebergAmount(text))}
                                    style={
                                        [styles.input, {
                                            fontFamily: icebergAmount.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                                            fontSize: icebergAmount.toString() === '' ? 15 : 18,
                                            color: theme.black,
                                        }]
                                    }
                                />
                            </Box>

                            <Btn
                                onPress={() => {
                                    const n = Number(icebergAmount) + 1
                                    dispatch(setIcebergAmount(n))
                                }}
                            >
                                <Txt style={styles.txt}>+</Txt>
                            </Btn>
                        </Box>
                    }
                </>
            }
        </Box>
    )
}

export default Iceberg

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