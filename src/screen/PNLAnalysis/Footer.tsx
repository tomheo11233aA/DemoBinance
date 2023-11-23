import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getChartStatisticsUser } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PNLEveryDay from './PNLEveryDay'
import PNL from './PNL'

const FONT = fonts.IBMPM

const Footer = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15} marginTop={20}>
            <Box row alignStart>
                <Box alignCenter flex={1}>
                    <Txt fontFamily={FONT} color={theme.black} >
                        {t('Account overview')}
                    </Txt>
                    <Box width={40} height={3} backgroundColor={colors.yellow} marginTop={7} />
                </Box>
                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={FONT}>
                        {t('Detail')}
                    </Txt>
                </Box>
            </Box>
            <PNLEveryDay />
            <PNL />
        </Box>
    )
}

export default Footer