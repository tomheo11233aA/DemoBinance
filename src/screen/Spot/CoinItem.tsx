import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React from 'react'
import { Coin } from 'src/model/tradeModel'

interface Props {
    coin: Coin;
    theme: any;
}

const CoinItem = ({ coin, theme }: Props) => {
    let percentChange: string = ''
    let colorPercentChange: string = '#f1485f'
    let round = coin.close < 10 ? 4 : (coin.close > 9 && coin.close < 51) ? 3 : 1

    if (coin.percentChange > 0) {
        percentChange = `+${coin.percentChange}%`
        colorPercentChange = '#30bc86'
    } else {
        percentChange = `${coin.percentChange}%`
    }

    return (
        <Btn
            onPress={() => {
                if (coin.currency == 'USDT' || coin.currency == contants.HX) {
                    navigate(screen.SPOT_COIN, { coin })
                }
            }}
            row
            alignCenter
            justifySpaceBetween
            marginVertical={10}
        >
            <Box row>
                <Icon
                    source={coin.image ?
                        { uri: contants.HOSTING + '/' + coin.image } :
                        coin.currency == contants.HX ? require('@images/Logo.png') : require('@images/future/usdt.png')
                    }
                    size={18}
                />
                <Box marginLeft={10}>
                    <Txt size={14} color={theme.black}>{coin.currency}</Txt>
                    <Txt color={colors.gray2} size={11}>
                        {coin.currency}
                    </Txt>
                </Box>
            </Box>

            <Box alignEnd>
                <Txt size={15} fontFamily={'Myfont24-Regular'} color={theme.black}>
                    {coin?.balance ? numberCommasDot(coin?.balance?.toFixed(2)) : 0}
                </Txt>
                <Box row alignCenter marginTop={5}>
                    <Txt size={12} fontFamily={'Myfont24-Regular'} color={colors.gray5}>
                        {numberCommasDot(coin?.exchangeRate?.toFixed(2))}
                    </Txt>
                    <Txt fontFamily={fonts.IBMPR} color={colors.gray5} size={11}>
                        {' $'}
                    </Txt>
                </Box>
            </Box>
        </Btn>
    )
}

export default CoinItem