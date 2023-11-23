import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    position: any
}

const PNLShare = ({ position }: Props) => {
    return (
        <Box row alignCenter marginTop={-7}>
            <Txt
                bold
                size={30}
                color={position.roe >= 0 ? colors.greenCan : colors.redCan}
                fontFamily={fonts.M24}
            >
                {position.roe >= 0 ? `+${numberCommasDot(position.roe.toFixed(2))}` : numberCommasDot(position.roe.toFixed(2))}
            </Txt>
            <Txt
                size={25}
                fontFamily={fonts.AS}
                color={position.roe >= 0 ? colors.greenCan : colors.redCan}
            >
                %
            </Txt>
        </Box>
    )
}

export default PNLShare