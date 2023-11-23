import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Back from '@reuse/Back'
import { fonts } from '@theme/fonts'
import React from 'react'

const Header = () => {
    return (
        <Box justifyCenter>
            <Box alignCenter absolute width={'100%'}>
                <Txt fontFamily={fonts.AS} size={18}>Account Info</Txt>
            </Box>
            <Back />
        </Box>
    )
}

export default Header