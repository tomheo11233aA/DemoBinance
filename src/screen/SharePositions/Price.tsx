import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { coinsFuturesChartSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { getCoinsFromSocket, useAppSelector } from '@hooks/index'

interface Props {
    t: any;
    position: any;
}

const Price = ({ position, t }: Props) => {
    const coins = useAppSelector(coinsFuturesChartSelector)
    const symbol = useAppSelector(symbolFuturesSelector)

    getCoinsFromSocket()

    let [close, percentChange, color, round] = [0, '0', colors.greenCan, 1]
    if (coins.length > 0) {
        const index = coins.findIndex(coin => coin.symbol === symbol)
        if (index >= 0) {
            close = coins[index]?.close
            round = close < 10 ? 4 : (close > 9 && close < 51) ? 3 : 1
            percentChange = coins[index]?.percentChange >= 0 ? `+${coins[index]?.percentChange}` : `${coins[index]?.percentChange}`
            color = coins[index]?.percentChange >= 0 ? colors.greenCan : colors.redCan
        }
    }
    return (
        <Box row marginTop={2}>
            <Box>
                <Txt
                    color={colors.gray5}
                    size={12}
                    fontFamily={fonts.BNPR}
                >
                    {t('Entry Price')}
                </Txt>
                <Txt
                    color={colors.gray5}
                    size={12}
                    fontFamily={fonts.BNPR}
                >
                    {t('Liq. Price')}
                </Txt>
            </Box>
            <Box marginLeft={20}>
                <Txt
                    color={colors.yellow}
                    size={12}
                    fontFamily={fonts.BNPR}
                    fontType={'600'}
                >
                    {/* {numberCommasDot(position?.entryPrice.toFixed(1))} */}
                    {position?.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </Txt>
                <Txt
                    color={colors.yellow}
                    size={12}
                    fontFamily={fonts.BNPR}
                    fontType={'600'}
                >
                    {/* {position.liq_price > 0 ? numberCommasDot(position.liq_price.toFixed(1)) : '--'} */}
                    {close > 0 ? numberCommasDot(close.toFixed(round)) : '--'}
                </Txt>
            </Box>
        </Box>
    )
}

export default Price