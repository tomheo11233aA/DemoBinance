import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

interface Props {
    title: string;
    size?: number;
    onPress: Function;
    icon: ImageSourcePropType;
}

const ItemOption = ({
    icon,
    title,
    onPress,
    size = 21,
}: Props) => {
    const theme = useTheme()
    return (
        <Btn
            width={60}
            alignCenter
            onPress={onPress}
        >
            <Box
                width={41}
                height={41}
                radius={50}
                alignCenter
                justifyCenter
                backgroundColor={theme.gray2}
            >
                <Icon
                    source={icon}
                    resizeMode={'contain'}
                    size={size}
                />
            </Box>
            <Txt
                color={theme.black}
                numberOfLines={2}
                size={10}
                center
                marginTop={5}
            >
                {title}
            </Txt>
        </Btn>
    )
}

export default ItemOption