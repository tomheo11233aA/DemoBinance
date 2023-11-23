import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import React from 'react'

const Layout = () => {
    const theme = useTheme()
    return (
        <Box row marginTop={10}>
            <Box
                flex={1}
                row
                alignCenter
                paddingHorizontal={10}
                justifySpaceBetween
                backgroundColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} size={11}>0.1</Txt>
                <Icon 
                    source={require('@images/trade/more.png')}
                    size={13}
                />
            </Box>
            <Box
                backgroundColor={theme.gray2}
                width={25}
                height={25}
                alignCenter
                justifyCenter
                radius={3}
                marginLeft={10}
            >
                <Icon
                    source={require('@images/future/layout.png')}
                    size={14}
                />
            </Box>
        </Box>
    )
}

export default Layout