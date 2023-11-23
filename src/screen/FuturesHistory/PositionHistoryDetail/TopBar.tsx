import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Back from '@reuse/Back'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { fonts } from '@theme/fonts'
import { useTheme } from '@hooks/index'
import Icon from '@commom/Icon'

const TopBar = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box justifySpaceBetween row paddingHorizontal={15}>
            <Back size={14} />
            <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                {t('Order detail')}
            </Txt>
            <Icon
                size={14}
                opacity={0}
                marginLeft={10}
                source={require('@images/back.png')}
            />
        </Box>
    )
}

export default TopBar