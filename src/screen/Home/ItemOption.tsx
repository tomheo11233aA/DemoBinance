import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
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
                width={50}
                height={50}
                radius={15}
                // alignCenter
                // justifyCenter
                borderWidth={0.5}
                borderColor={colors.gray3}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
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