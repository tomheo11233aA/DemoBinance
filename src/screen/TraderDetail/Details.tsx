import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import RowItem from './RowItem'

const Details = ({ theme, t }: any) => {
    return (
        <Box marginTop={40}>
            <Txt size={16} color={theme.black} fontFamily={fonts.IBMPM}>
                {t('Details')}
            </Txt>
            <Box>
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Win Ratio')}
                    value={`--`}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Total Transactions')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('No. of Winning Trades')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('No. of Losing Trades')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Average Profit')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Average Profit')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Average Losses')}
                    value={'--'}
                />
                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('PnL Ratio')}
                    value={'--'}
                />

                <Box row alignCenter justifySpaceBetween marginTop={15}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Average Holding Time')}
                    </Txt>
                    <Txt color={theme.black} size={11}>
                        {'--'}
                    </Txt>
                </Box>

                <Box row alignCenter justifySpaceBetween marginTop={15}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Trading Frequency (Weekly)')}
                    </Txt>
                    <Txt color={theme.black} size={11}>
                        {'--'}
                    </Txt>
                </Box>

                <Box row alignCenter justifySpaceBetween marginTop={15}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Trade Days')}
                    </Txt>
                    <Txt color={theme.black} size={11}>
                        {'--'}
                    </Txt>
                </Box>

                <RowItem
                    marginTop={15}
                    colorValue={theme.black}
                    title={t('Last Trading Time')}
                    value={'--'}
                />
            </Box>
        </Box>
    )
}

export default Details