import Box from '@commom/Box'
import { width } from '@util/responsive'
import React, { memo } from 'react'
import { Text } from 'react-native'
import { HEIGH_CONTAINER } from './Chart'
import Icon from '@commom/Icon'
import { colors } from '@theme/colors'
import { applyLetterSpacing } from '@method/format'
import { useTheme } from '@hooks/index'

const LogoChart = ({ color, height }: any) => {
    const theme = useTheme()
    const COLOR = color || theme.gray
    return (
        <Box
            height={height}
            width={width}
            row
            justifyCenter
            alignCenter
            absolute
        >
            <Icon
                source={require('@images/Logo.png')}
                size={25}
                tintColor={COLOR}
            />
            <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold', color: COLOR }}>
                {applyLetterSpacing('BINANCE')}
            </Text>
        </Box>
    )
}

export default memo(LogoChart)