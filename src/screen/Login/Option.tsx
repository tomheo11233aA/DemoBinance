import { View, Text, Platform } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { colors } from '@theme/colors'
import Btn from '@commom/Btn'
import Img from '@commom/Img'

const Option = ({ theme }: any) => {
    return (
        <Box>
            <Box
                marginTop={Platform.OS === 'android' ? 10 : 0}
                row
                justifySpaceBetween
                width={80}
                paddingVertical={5}
                paddingHorizontal={10}
                radius={20}
                backgroundColor={theme.gray12}
                alignSelf={'flex-end'}
                alignCenter
            >
                <Btn>
                    <Img
                        source={require('@images/login/dots.png')}
                        width={23}
                        height={23}
                        resizeMode='contain'
                    />
                </Btn>
                <Box width={1} height={15} backgroundColor={colors.grayBlue} />
                <Btn>
                    <Img
                        source={require('@images/login/remove.png')}
                        width={20}
                        height={20}
                        resizeMode='contain'
                    />
                </Btn>
            </Box>
        </Box>
    )
}

export default Option