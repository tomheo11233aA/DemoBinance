import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
            paddingHorizontal={15}
        >
            <Back />
            <Txt color={theme.black} fontFamily={fonts.AS} size={18}>
                {t('Binance Earn')}
            </Txt>
            <Txt></Txt>
        </Box>
    )
}

export default Header