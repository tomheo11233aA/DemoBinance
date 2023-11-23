import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    t: any;
    position: any;
}

const Price = ({ position, t }: Props) => {
    return (
        <Box row marginTop={2}>
            <Box>
                <Txt color={colors.gray5} size={11}>
                    {t('Entry Price')}
                </Txt>
                <Txt color={colors.gray5} size={11}>
                    {t('Liq. Price')}
                </Txt>
            </Box>
            <Box marginLeft={20} marginTop={2}>
                <Txt color={colors.yellow} size={12} fontFamily={fonts.M23}>
                    {numberCommasDot(position?.entryPrice.toFixed(1))}
                </Txt>
                <Txt
                    color={colors.yellow}
                    size={12}
                    fontFamily={fonts.M23}
                    marginTop={3}
                >
                    {position.liq_price > 0 ? numberCommasDot(position.liq_price.toFixed(1)) : '--'}
                </Txt>
            </Box>
        </Box>
    )
}

export default Price