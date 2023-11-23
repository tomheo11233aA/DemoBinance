import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { getCoinsFromSocket, useAppSelector, useTheme } from '@hooks/index'
import { calcPNL, calcROE, numberCommasDot } from '@method/format'
import { coinsFuturesChartSelector, positionsFuturesSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const PNLToday = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const coins = useAppSelector(coinsFuturesChartSelector)
    const positions = useAppSelector(positionsFuturesSelector)

    getCoinsFromSocket()

    let totalROE = 0
    let totalPNL = 0
    positions.map((position) => {
        const index = coins.findIndex(coin => coin.symbol == position.symbol)
        const close = coins[index]?.close || 0
        const PNL = calcPNL(position, close)
        let ROE = calcROE(PNL, position)
        totalROE += ROE
        totalPNL += PNL
    })

    return (
        <Box alignCenter={'center'} marginTop={30}>
            <Box row alignCenter>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t(`Today's PNL`)}
                </Txt>
                <Icon
                    size={12}
                    marginLeft={5}
                    source={require('@images/login/view.png')}
                />
            </Box>
            <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                {`${numberCommasDot(totalROE?.toFixed(2))}%`}
            </Txt>
            <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                {`${numberCommasDot(totalPNL?.toFixed(2))}`}
                <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                    {' USDT'}
                </Txt>
            </Txt>
        </Box>
    )
}

export default PNLToday