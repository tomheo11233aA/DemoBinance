import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    position: any;
}

const TEXT_SIZE = 12
const StatisticalModalTPSLPosition = ({ position }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const coins = useAppSelector(coinsFuturesChartSelector)

    const side = position?.side === 'buy' ? 'Long' : 'Short'
    const color = position?.side === 'buy' ? colors.green2 : colors.red3

    let rounding: number = 1
    let mark_price: number = 0

    if (coins.length > 0) {
        let index = coins.findIndex(coin => coin.symbol === position?.symbol)
        const close = coins[index]?.close || 0
        mark_price = close
        rounding = close < 10 ? 4 : (close > 9 && close < 51) ? 3 : 1
    }

    return (
        <Box
            marginTop={15}
            paddingBottom={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.gray5} size={TEXT_SIZE}>{t('Symbol')}</Txt>
                <Txt color={color} size={TEXT_SIZE}>
                    {`${position?.symbol} ${t('Perpetual')} / ${t(side)} `}
                    <Txt fontFamily={fonts.M23} size={TEXT_SIZE + 2} color={color}>
                        {position?.core}
                        <Txt color={color} size={TEXT_SIZE}>x</Txt>
                    </Txt>
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={10}>
                <Txt color={colors.gray5} size={TEXT_SIZE}>{`${t('Entry Price')} (USDT)`}</Txt>
                <Txt
                    fontFamily={fonts.M23}
                    size={TEXT_SIZE + 2}
                    color={theme.black}
                >
                    {numberCommasDot(position?.entryPrice?.toFixed(rounding))}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={10}>
                <Txt color={colors.gray5} size={TEXT_SIZE}>
                    {`${t('Mark Price')} (USDT)`}
                </Txt>
                <Txt
                    color={theme.black}
                    size={TEXT_SIZE + 2}
                    fontFamily={fonts.M23}
                >
                    {numberCommasDot(mark_price?.toFixed(rounding))}
                </Txt>
            </Box>
        </Box>
    )
}

export default StatisticalModalTPSLPosition