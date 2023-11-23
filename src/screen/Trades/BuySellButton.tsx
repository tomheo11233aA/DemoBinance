import { getWalletThunk } from '@asyncThunk/spotAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import LoadingWhite from '@reuse/LoadingWhite'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { amountSpotSelector, coinChoosedSpotSelector, priceSpotSelector, sideSpotSelector, totalAmountSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { orderSpot } from '@service/spotService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { Alert } from 'react-native'

const BuySellButton = ({ toastTopRef, t }: any) => {
    const dispatch = useAppDispatch()
    const side = useAppSelector(sideSpotSelector)
    const amount = useAppSelector(amountSpotSelector)
    const priceLimit = useAppSelector(priceSpotSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    const totalAmount = useAppSelector(totalAmountSpotSelector)

    const [loading, setLoading] = useState<boolean>(false)

    const handleOrderFuture = async () => {
        let close: number = 0
        for (let index = 0; index < coins.length; index++) {
            if (coins[index].symbol === coinChoosed.symbol) {
                close = coins[index].close
                break
            }
        }
        setLoading(true)
        const res = await orderSpot({
            amount: totalAmount === 'Amount' ?
                amount : (Number(amount) * close),
            symbol: coinChoosed.symbol,
            side,
            typeTrade,
            priceLimit,
        })
        if (!res.error) {
            if (res.status) {
                toastTopRef.current.slideDown(t(res.message), true)
                await dispatch(getProfileThunk())
                await dispatch(getWalletThunk())
            } else {
                Alert.alert(t(res.message))
            }
        }
        setLoading(false)
    }

    return (
        <Btn
            radius={5}
            height={37}
            marginTop={10}
            disabled={loading}
            onPress={handleOrderFuture}
            backgroundColor={side === 'buy' ? colors.green2 : colors.red2}
        >
            {loading ?
                <LoadingWhite /> :
                <Txt color={colors.white} size={15} fontFamily={fonts.SGM}>
                    {side === 'buy' ? `${t('Buy')} ${coinChoosed.currency}` :
                        `${t('Sell')} ${coinChoosed.currency}`}
                </Txt>
            }
        </Btn>
    )
}

export default BuySellButton