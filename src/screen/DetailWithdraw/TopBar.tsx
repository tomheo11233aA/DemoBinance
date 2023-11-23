import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Back from '@reuse/Back'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@hooks/index'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'

const TopBar = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box row justifySpaceBetween alignCenter paddingHorizontal={15}>
            <Back size={14} />
            <Txt color={theme.black} fontFamily={fonts.IBMPM} size={16}>
                {t('Withdrawal Infomation')}
            </Txt>
            <Icon
                size={13}
                source={require('@images/trade/share.png')}
            />
        </Box>
    )
}

export default TopBar