import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Fee = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            alignCenter
            marginHorizontal={15}
            backgroundColor={theme.gray8}
            padding={10}
            radius={3}
            marginTop={15}
            marginBottom={10}
        >
            <Txt size={10} color={theme.black}>{`${t('Use BNB for fees(10% discount)')}   `}</Txt>
            <Icon
                source={require('@images/future/info.png')}
                size={12}
            />
        </Box>
    )
}

export default Fee