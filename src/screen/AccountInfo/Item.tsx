import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { ImageSourcePropType } from 'react-native/types'

interface Props {
    title: string;
    title2: string;
    color?: string;
    icon2?: string;
    sizeIcon2?: number;
    icon: ImageSourcePropType;
}

const Item = ({
    title,
    title2,
    icon,
    sizeIcon2 = 13,
    color = colors.grayBlue,
    icon2 = require('@images/back.png'),
}: Props) => {
    return (
        <Box row alignCenter justifySpaceBetween marginVertical={20}>
            <Box row alignCenter>
                <Icon
                    size={23}
                    source={icon}
                    marginRight={15}
                    resizeMode={'contain'}
                />
                <Box>
                    <Txt fontFamily={fonts.AS} size={16}>{title}</Txt>
                    <Txt color={color} size={13}>{title2}</Txt>
                </Box>
            </Box>

            <Box rotateZ={'180deg'}>
                <Icon
                    source={icon2}
                    size={sizeIcon2}
                    resizeMode={'contain'}
                />
            </Box>
        </Box>
    )
}

export default Item