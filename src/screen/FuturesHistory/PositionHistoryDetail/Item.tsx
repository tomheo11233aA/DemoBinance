import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import USDT from './USDT'

const Item = ({ theme, t, item, positionItem }: any) => {
    return (
        <Box
            paddingVertical={10}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween alignCenter>
                <Txt style={{
                    fontSize: 12,
                    color: colors.grayBlue,
                    fontFamily: fonts.IBMPR,
                }}>
                    {t('Time')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {item.created_at}
                </Txt>
            </Box>
            <USDT
                theme={theme}
                title={t('Amount')}
                value={item.amount}
            />
            <USDT
                theme={theme}
                title={t('Price')}
                value={positionItem.closePrice}
            />
            <USDT
                theme={theme}
                title={t('Profit is recorded')}
                value={positionItem.PNL}
            />
            <USDT
                theme={theme}
                title={t('Fee')}
                value={positionItem.feeFutureClose}
            />
            <Box row justifySpaceBetween alignCenter marginTop={10}>
                <Txt style={{
                    fontSize: 12,
                    color: colors.grayBlue,
                    fontFamily: fonts.IBMPR,
                }}>
                    {t('Role')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
                    {t('Taker')}
                </Txt>
            </Box>
        </Box>
    )
}

export default Item