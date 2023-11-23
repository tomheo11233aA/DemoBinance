import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SpotGrid = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box width={'100%'} alignCenter marginBottom={100}>
            <Box width={'75%'} alignCenter height={120}>
                <Txt size={15} marginVertical={25} color={theme.black}>{t('Not grid')}</Txt>
            </Box>
        </Box>
    )
}

export default SpotGrid