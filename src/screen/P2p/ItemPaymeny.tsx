import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    title: string;
    color?: string;
}

const ItemPaymeny = ({
    title,
    color = 'red',
}: Props) => {
    return (
        <Box row alignCenter marginVertical={3}>
            <Txt size={10} fontFamily={fonts.SGM} color={colors.gray5}>
                {title}
            </Txt>
            <Box
                width={3}
                radius={5}
                marginLeft={3}
                height={'100%'}
                backgroundColor={color}
            />
        </Box>
    )
}

export default ItemPaymeny