import { getWalletThunk } from '@asyncThunk/spotAsyncThunk'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import HideWallet from '@screen/Overview/HideWallet'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { Coin } from 'src/model/tradeModel'
import CoinItem from './CoinItem'
import { useTranslation } from 'react-i18next'
import { ICoins } from 'src/model/futuresModel'
import { getWalletToSymbol } from '@service/fundingService'
import { Alert } from 'react-native'
import contants from '@util/contants'

const Coins = ({ data }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [coinHX, setCoinHX] = useState<any>({})

    useEffect(() => {
        handleGetWallet()
    }, [])

    const handleGetWallet = async () => {
        await dispatch(getWalletThunk())
        let amount = 0
        const res = await getWalletToSymbol({ symbol: 'HX.BEP20' })
        if (res.status) {
            amount = res?.data?.amount || 0
        }
        setCoinHX({
            currency: contants.HX,
            balance: amount,
            exchangeRate: amount * 0.006,
        })
    }

    return (
        <Box
            marginTop={15}
            paddingHorizontal={15}
            paddingBottom={100}
        >
            <Box marginBottom={15} row justifySpaceBetween>
                <Txt fontFamily={fonts.AS} size={16} color={theme.black}>{t('Balances')}</Txt>
                <Icon
                    size={15}
                    resizeMode={'contain'}
                    source={require('@images/home/search.png')}
                />
            </Box>

            <HideWallet t={t} />
            <Box>
                {data.map((coin: Coin) =>
                    <CoinItem
                        coin={coin}
                        key={coin.id}
                        theme={theme}
                    />
                )}
                <CoinItem
                    coin={coinHX}
                    theme={theme}
                />
            </Box>
        </Box>
    )
}

export default Coins