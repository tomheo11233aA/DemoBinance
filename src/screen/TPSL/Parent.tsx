import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import { IOpenOrder } from 'src/model/fundingModel'
import { capitalizeFirst, numberCommasDot } from '@method/format'

interface Props {
    itemOpenOrder: IOpenOrder;
}

const Parent = ({ itemOpenOrder }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const price = itemOpenOrder.orderEntryPrice
    const ROUND = price < 10 ? 4 : (price > 9 && price < 51) ? 3 : 1

    return (
        <Box
            marginTop={25}
            paddingVertical={15}
            paddingHorizontal={13}
            backgroundColor={theme.gray2}
        >
            <Box row justifySpaceBetween>
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                    {itemOpenOrder.typeTrade}
                </Txt>
                <Txt
                    size={12}
                    color={colors.grayBlue}
                    fontFamily={fonts.IBMPR}
                >
                    {t('New')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween marginTop={13}>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t('Side')}
                </Txt>
                <Txt
                    size={12}
                    fontFamily={fonts.IBMPR}
                    color={itemOpenOrder.side === 'buy' ? colors.green2 : colors.red3}
                >
                    {t(capitalizeFirst(itemOpenOrder.side))}
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginVertical={5}>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t('Amount')}
                </Txt>
                <Txt
                    color={theme.black}
                    fontFamily={fonts.M23}
                >
                    {numberCommasDot(itemOpenOrder?.amount?.toFixed(3))}
                    <Txt color={theme.black} size={11}>{' USDT'}</Txt>
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t('Price')}
                </Txt>
                <Txt
                    color={theme.black}
                    fontFamily={fonts.M23}
                >
                    {numberCommasDot(itemOpenOrder.orderEntryPrice.toFixed(ROUND))}
                    <Txt color={theme.black} size={11}>{' USDT'}</Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default Parent