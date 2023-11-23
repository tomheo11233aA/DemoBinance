import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import { fonts } from '@theme/fonts'
import React from 'react'

const Header = () => {
    const theme = useTheme()

    return (
        <Box row alignCenter justifySpaceBetween>
            <Back size={14} />
            <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                TP/SL
            </Txt>
            <Icon
                size={10}
                opacity={0}
                source={require('@images/future/close.png')}
            />
        </Box>
    )
}

export default Header