import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    setShowFilter: Function;
}

const Header = ({ setShowFilter }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
        >
            <Back size={16} />
            <Txt fontFamily={fonts.AS} size={16} color={theme.black}>
                {t('USDⓢ-M Futures History')}
            </Txt>
            <Btn
                onPress={() => setShowFilter(true)}
            >
                <Icon
                    size={15}
                    tintColor={colors.grayBlue}
                    source={require('@images/wallet/filter.png')}
                />
            </Btn>
        </Box>
    )
}

export default Header