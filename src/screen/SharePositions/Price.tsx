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
                <Txt
                    color={colors.gray5}
                    size={12}
                    fontFamily={fonts.BNPR}
                >
                    {t('Entry Price')}
                </Txt>
                <Txt
                    color={colors.gray5}
                    size={12}
                    fontFamily={fonts.BNPR}
                >
                    {t('Liq. Price')}
                </Txt>
            </Box>
            <Box marginLeft={20}>
                <Txt
                    color={colors.yellow}
                    size={12}
                    fontFamily={fonts.BNPR}
                    fontType={'600'}
                >
                    {/* {numberCommasDot(position?.entryPrice.toFixed(1))} */}
                    {/* {position?.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })} */}
                    3,2271
                </Txt>
                <Txt
                    color={colors.yellow}
                    size={12}
                    fontFamily={fonts.BNPR}
                    fontType={'600'}
                >
                    {/* {position.liq_price > 0 ? numberCommasDot(position.liq_price.toFixed(1)) : '--'} */}
                    {/* {position.liq_price > 0 ? position.liq_price.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '--'} */}
                    3,5460
                </Txt>
            </Box>
        </Box>
    )
}

export default Price