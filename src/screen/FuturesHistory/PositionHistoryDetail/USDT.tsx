import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import { numberCommasDot } from '@method/format'

const USDT = ({
    title,
    value,
    theme,
}: any) => {
    return (
        <Box row justifySpaceBetween alignCenter marginTop={10}>
            <Txt style={{
                fontSize: 12,
                color: colors.grayBlue,
                fontFamily: fonts.IBMPR,
            }}>
                {title}
            </Txt>
            <Txt color={theme.black} fontFamily={fonts.M23}>
                {value == '--' ? '--' : numberCommasDot(value)}
                {value != '--' &&
                    <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
                        {` USDT`}
                    </Txt>
                }
            </Txt>
        </Box>
    )
}

export default USDT