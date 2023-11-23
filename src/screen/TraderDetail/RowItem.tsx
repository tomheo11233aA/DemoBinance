import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'

interface Props {
    marginTop: number;
    colorValue: any;
    title: any;
    value: any;
}

const RowItem = ({
    title,
    value,
    marginTop,
    colorValue,
}: Props) => {
    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
            marginTop={marginTop}
        >
            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                {title}
            </Txt>
            <Txt color={colorValue} fontFamily={fonts.M23}>
                {value}
            </Txt>
        </Box>
    )
}

export default RowItem