import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { tabBuySellP2pSelector } from '@selector/p2pSelector'
import { setTabBuySell } from '@slice/p2pSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const BuySellTab = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const tabBuySell = useAppSelector(tabBuySellP2pSelector)

    return (
        <Box row alignCenter justifySpaceBetween>
            <Box row>
                <Btn onPress={() => dispatch(setTabBuySell('buy'))}>
                    <Txt
                        fontFamily={fonts.IBMPM}
                        color={tabBuySell === 'buy' ? theme.black : colors.gray2}
                    >
                        {t('Buy')}
                    </Txt>
                </Btn>

                <Box
                    width={1}
                    height={15}
                    backgroundColor={colors.gray3}
                    marginHorizontal={10}
                />

                <Btn onPress={() => dispatch(setTabBuySell('sell'))}>
                    <Txt
                        fontFamily={fonts.IBMPM}
                        color={tabBuySell === 'sell' ? theme.black : colors.gray2}
                    >
                        {t('Sell')}
                    </Txt>
                </Btn>
            </Box>

            <Icon
                size={12}
                resizeMode={'contain'}
                source={require('@images/trade/bell.png')}
            />
        </Box>
    )
}

export default BuySellTab