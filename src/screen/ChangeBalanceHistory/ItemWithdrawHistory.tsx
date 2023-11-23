import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'

const IBMPR = fonts.IBMPR
const ItemWithdrawHistory = ({ item, index, theme, t }: any) => {
    return (
        <Btn
            row
            key={index}
            marginTop={25}
            justifySpaceBetween
            onPress={() => navigate(screen.DETAIL_WITHDRAW, { withdrawItem: item })}
        >
            <Box>
                <Txt fontFamily={fonts.IBMPM} marginBottom={5} size={13} color={theme.black}>
                    {item.symbol}
                </Txt>
                <Txt size={11} color={colors.grayBlue} fontFamily={IBMPR}>
                    {item.toAddress}
                </Txt>
                <Txt size={11} color={colors.grayBlue} fontFamily={IBMPR}>
                    {item.created_at}
                </Txt>
            </Box>

            <Box>
                <Txt fontFamily={fonts.M24} color={theme.black}>
                    {numberCommasDot(item.amount)}
                </Txt>
                <Box row alignCenter marginTop={5}>
                    <Txt color={colors.greenCan} size={5} marginRight={2}>
                        ●
                    </Txt>
                    <Txt color={colors.grayBlue} size={10} fontFamily={IBMPR}>
                        {t('Done')}
                    </Txt>
                </Box>
            </Box>
        </Btn>
    )
}

export default ItemWithdrawHistory