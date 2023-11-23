import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const NoData = ({ message }: { message: string }) => {
    return (
        <Box alignCenter paddingTop={30}>
            <Icon
                source={require('@images/future/find.png')}
                size={70}
                resizeMode={'contain'}
            />
            <Txt marginTop={15} color={colors.gray5} fontFamily={fonts.SGM}>
                {message}
            </Txt>
        </Box>
    )
}

export default NoData