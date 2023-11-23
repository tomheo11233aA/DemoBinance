import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { capitalizeFirst } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { IPositions } from 'src/model/futuresModel'

interface Props {
    t: any;
    position: IPositions | null;
}

const Perpetual = ({ position, t }: Props) => {
    return (
        <Box
            row
            alignCenter
            marginTop={40}
            marginLeft={10}
            marginBottom={10}
        >
            <Txt
                size={12}
                fontFamily={fonts.AS}
                color={position?.side === 'buy' ? colors.green2 : colors.red2}
            >
                {t(capitalizeFirst(position?.side || ''))}
            </Txt>
            <Box
                borderLeftWidth={1}
                borderRightWidth={1}
                marginHorizontal={10}
                paddingHorizontal={10}
                borderColor={colors.gray5}
            >
                <Txt color={'white'} bold size={14} fontFamily={'Myfont31-Regular'}>
                    {position?.core}x
                </Txt>
            </Box>
            <Txt color={'white'} bold size={11} fontFamily={fonts.RM}>
                {`${position?.symbol} ${t('Perpetual')}`}
            </Txt>
        </Box>
    )
}

export default Perpetual