import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    theme: any;
    title: any;
    value: any;
    onPress: Function;
}

const Item = ({
    theme,
    title,
    value,
    onPress,
}: Props) => {
    return (
        <Btn
            onPress={onPress}
            row
            justifySpaceBetween
            alignCenter
            marginTop={20}
        >
            <Txt size={13} fontFamily={fonts.SGM} color={theme.black}>
                {title}
            </Txt>

            <Box row alignCenter>
                <Txt size={13} fontFamily={fonts.SGM} color={colors.gray8}>
                    {value}
                </Txt>
                <Icon
                    source={require('@images/wallet/right_arrow.png')}
                    size={10}
                    resizeMode={'contain'}
                    marginLeft={10}
                />
            </Box>
        </Btn>
    )
}

export default Item