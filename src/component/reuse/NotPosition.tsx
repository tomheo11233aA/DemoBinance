import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NotPosition = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box width={'100%'} alignCenter marginBottom={100}>
            <Box width={'75%'} alignCenter>
                <Txt size={15} marginVertical={25} color={theme.black}>{t('Not positions')}</Txt>
                <Txt color={colors.gray5} size={13}>
                    {t("You can set up trading bots that automatically trade day-to-day arbitrage, or monitor the leaderboards to check the top trading positions.")}
                </Txt>
            </Box>
        </Box>
    )
}

export default NotPosition