import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CloseModalFilter = ({ setShow }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
        >
            <Txt></Txt>
            <Txt fontFamily={fonts.AS} size={16} color={theme.black}>
                {t('Filter')}
            </Txt>
            <Btn onPress={() => setShow(false)}>
                <Icon
                    size={15}
                    source={require('@images/future/close.png')}
                />
            </Btn>
        </Box>
    )
}

export default CloseModalFilter