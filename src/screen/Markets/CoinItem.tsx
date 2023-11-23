import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Coin } from 'src/model/tradeModel'

interface Props {
    coin: Coin,
    theme: any,
    onMoveTrade: (coin: Coin) => void
}

const CoinItem = ({ coin, theme, onMoveTrade }: Props) => {
    let percentChange: string = ''
    let colorPercentChange: string = '#f1485f'

    if (coin.percentChange > 0) {
        percentChange = `+${coin.percentChange?.toFixed(2)}%`
        colorPercentChange = '#30bc86'
    } else {
        percentChange = `${coin.percentChange?.toFixed(2)}%`
    }

    return (
        <Btn
            row
            alignCenter
            justifySpaceBetween
            marginVertical={10}
            onPress={() => onMoveTrade(coin)}
        >
            <Box>
                <Box row alignCenter>
                    <Txt size={15} fontFamily={fonts.SGM} color={theme.black}>
                        {coin.currency}
                        <Txt size={10} color={colors.grayBlue2}>
                            {' /USDT'}
                        </Txt>
                    </Txt>
                    <Box
                        backgroundColor={theme.gray2}
                        padding={1}
                        marginLeft={5}
                        alignCenter
                        justifyCenter
                    >
                        <Txt fontFamily={fonts.M24} color={colors.yellow} size={12}>
                            10x
                        </Txt>
                    </Box>
                </Box>
                <Txt size={10} color={colors.grayBlue2}>
                    {'KL '}
                    <Txt fontFamily={fonts.M23} size={12} color={colors.grayBlue2}>
                        14,81
                    </Txt>
                    <Txt size={10} color={colors.grayBlue2}>
                        {' M'}
                    </Txt>
                </Txt>
            </Box>

            <Box row>
                <Box alignEnd>
                    <Txt size={16} fontFamily={fonts.M24} color={colorPercentChange}>
                        {numberCommasDot(coin.close)}
                    </Txt>
                    <Txt
                        size={12}
                        color={colors.grayBlue2}
                        fontFamily={fonts.M24}
                        marginTop={3}
                    >
                        {numberCommasDot(coin.bestAsk?.toFixed(2))}
                        <Txt size={10} color={colors.grayBlue2}>{' $'}</Txt>
                    </Txt>
                </Box>

                <Box
                    backgroundColor={colorPercentChange}
                    alignCenter
                    justifyCenter
                    width={80}
                    radius={3}
                    marginLeft={20}
                    height={32}
                >
                    <Txt
                        size={12}
                        fontFamily={fonts.RM}
                        color={colors.white}
                    >
                        {percentChange}
                    </Txt>
                </Box>
            </Box>
        </Btn>
    )
}

export default CoinItem