import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const ItemOrderHistory = ({ item, theme, t }: any) => {
    const color = item.side === 'buy' ? colors.green2 : colors.red3
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    return (
        <Box
            alignCenter={false}
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween>
                <Box>
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        {item.symbol} {t('Perpetual')}
                    </Txt>
                    <Txt color={color} fontFamily={fonts.IBMPM} size={11}>
                        {t(side)} / {t(item.typeTrade)}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={13}>
                        {item.created_at}
                    </Txt>
                    {item.type === 1 ?
                        <Box
                            marginTop={5}
                            paddingVertical={2}
                            paddingHorizontal={5}
                            backgroundColor={theme.green}
                        >
                            <Txt color={colors.green} size={9}>
                                {t('Matched')}
                            </Txt>
                        </Box> :
                        <Box
                            marginTop={5}
                            paddingVertical={2}
                            paddingHorizontal={5}
                            backgroundColor={theme.gray2}
                        >
                            <Txt color={colors.grayBlue} size={9}>
                                {t('Canceled')}
                            </Txt>
                        </Box>
                    }
                </Box>
            </Box>

            <Box
                row
                alignCenter
                marginTop={10}
                justifySpaceBetween
            >
                <Txt color={theme.black} size={12}>
                    {`${t('Amount')} (BTC)`}
                </Txt>
                <Txt
                    size={13}
                    color={theme.black}
                    fontFamily={fonts.M23}
                >
                    {numberCommasDot(item.amount?.toFixed(2))}
                    <Txt color={colors.grayBlue} size={13}>
                        {' / 0,00'}
                    </Txt>
                </Txt>
            </Box>

            <Box
                row
                alignCenter
                marginTop={10}
                justifySpaceBetween
            >
                <Txt color={theme.black} size={12} fontFamily={fonts.IBMPR}>
                    {t('Price')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23} size={13}>
                    {'--'}
                    <Txt color={colors.grayBlue} size={13}>
                        {' / 0,00'}
                    </Txt>
                </Txt>
            </Box>

            {/* <Box
          row
          alignCenter
          marginTop={10}
          justifySpaceBetween
        >
          <Txt color={theme.black}>
            {'Reduce Only'}
          </Txt>
  
          <Txt color={theme.black} size={15}>
            {' Correct'}
          </Txt>
        </Box> */}
        </Box>
    )
}

export default ItemOrderHistory