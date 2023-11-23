import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { calcPNL, numberCommasDot } from '@method/format'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { IPositions } from 'src/model/futuresModel'

interface Props {
    t: any;
    theme: any;
    position: IPositions | null;
}

const ProfitClose = ({ position, theme, t }: Props) => {
    const coins = useAppSelector(coinsFuturesChartSelector)

    let PNL = 0
    let SIZE = 0
    if (coins.length > 0 && position) {
        let index = coins.findIndex(coin => coin.symbol === position.symbol)
        const close = coins[index]?.close || 0
        PNL = calcPNL(position, close)
        SIZE = position.margin * position.core
    }

    const text_color = PNL >= 0 ? colors.green2 : colors.red3

    return (
        <Box marginTop={30}>
            <Box row alignCenter justifySpaceBetween>
                <Txt size={12} color={colors.gray5}>{t('Position Amount')}</Txt>
                <Txt fontFamily={fonts.M23} color={theme.black}>
                    {numberCommasDot(SIZE.toFixed(2))}
                    <Txt size={11} color={theme.black}> USDT</Txt>
                </Txt>
            </Box>

            <Box
                row
                alignCenter
                justifySpaceBetween
            >
                <Txt size={12} color={colors.gray5}>
                    {t('Estimated PNL')}
                    <Txt bold size={12} color={colors.gray5}> ⓘ</Txt>
                </Txt>
                <Txt fontFamily={fonts.M23} color={text_color}>
                    {numberCommasDot(PNL?.toFixed(2))}
                    <Txt size={11} color={text_color}> USDT</Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default ProfitClose