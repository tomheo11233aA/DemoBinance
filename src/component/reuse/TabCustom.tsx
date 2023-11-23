import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { ImageSourcePropType } from 'react-native/types'

type Props = {
    icon: ImageSourcePropType,
    size?: number,
    title: any,
    forcus: boolean,
}

const TabCustom = ({ icon, title, size = 20, forcus }: Props) => {
    return (
        <Box alignCenter>
            <Img
                source={icon}
                width={size}
                height={size}
                marginBottom={5}
                resizeMode={'contain'}
            />
            <Txt
                color={forcus ? '#eeba07' : colors.grayBlue}
                size={10}
                fontFamily={fonts.FSCR}
            >
                {title}
            </Txt>
        </Box>
    )
}

export default TabCustom

