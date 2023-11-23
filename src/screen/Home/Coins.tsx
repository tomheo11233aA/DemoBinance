import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ICoins } from 'src/model/futuresModel'
import { Coin } from 'src/model/tradeModel'
import CoinItem from './CoinItem'

const Coins = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsFuturesChartSelector)

    const handleMoveTrade = (coin: Coin) => {
        dispatch(futuresSlice.actions.setSymbol({
            symbol: coin.symbol,
            currency: coin.currency,
        }))
        navigate(screen.TRADE)
    }

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.gray2} size={12}>{t('Name')}</Txt>
                <Box row >
                    <Txt color={colors.gray2} size={12}>{t('Last Price')}</Txt>

                    <Box width={80} alignEnd marginLeft={20}>
                        <Txt
                            color={colors.gray2}
                            size={12}
                        >
                            {t('24h chg%')}
                        </Txt>
                    </Box>
                </Box>
            </Box>
            <Box marginTop={10}>
                {coins.map((coin: ICoins) =>
                    <CoinItem
                        key={coin.id}
                        coin={coin}
                        theme={theme}
                        onMoveTrade={handleMoveTrade}
                    />
                )}
            </Box>
        </Box >
    )
}

export default Coins