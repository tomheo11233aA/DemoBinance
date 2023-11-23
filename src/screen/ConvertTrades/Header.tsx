import Box from '@commom/Box'
import Icon from '@commom/Icon'
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
        <Box row alignCenter justifySpaceBetween>
            <Back size={18} color='#838d9d' />
            <Box row alignCenter>
                <Txt fontFamily={fonts.AS} size={16} marginRight={5} color={theme.black}>
                    {t('Convert')}
                </Txt>
                <Box backgroundColor={theme.green} padding={3}>
                    <Txt color={'#3cb389'} size={12}>
                        {t('0 fees')}
                    </Txt>
                </Box>
            </Box>
            <Box row alignCenter>
                <Icon
                    size={16}
                    marginRight={15}
                    resizeMode={'contain'}
                    source={require('@images/future/book.png')}
                />
                <Icon
                    size={18}
                    resizeMode={'contain'}
                    source={require('@images/future/page-oclock.png')}
                />
            </Box>
        </Box>
    )
}

export default Header