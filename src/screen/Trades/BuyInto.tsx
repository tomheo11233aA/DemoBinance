import { getTotalBuyThunk } from '@asyncThunk/futuresAsyncThunk'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { kFormatter, numberCommasDot } from '@method/format'
import { buysSpotSelector, coinChoosedSpotSelector, icebergSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { setBuys } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import io from 'socket.io-client'
import { ISellBuy } from 'src/model/futuresModel'

const BuyInto = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const buys = useAppSelector(buysSpotSelector)
    const iceberg = useAppSelector(icebergSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)

    const LIMIT = (typeTrade === 'Limit' && iceberg) ? 7
        : (typeTrade === 'Limit' && !iceberg) ? 6 : 5 

    useEffect(() => {
        handleGetTotalSell()
    }, [])

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)
        newSocket.on(`${coinChoosed.symbol}BUY`, (data) => {
            dispatch(setBuys(data))
        })

        return () => newSocket.disconnect()
    }, [coinChoosed])

    const handleGetTotalSell = async () => {
        const { payload } = await dispatch(
            getTotalBuyThunk({
                limit: LIMIT,
                page: 1,
                symbol: coinChoosed.symbol,
            })
        )
    }

    return (
        <View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.txtClose}>
                    ≈ {numberCommasDot(buys?.price)}
                    <Txt style={[styles.txtClose, { fontSize: 12 }]}>
                        {' $'}
                    </Txt>
                </Text>
            </View>
            {buys.data.slice(0, LIMIT).map((buy: ISellBuy, index: number) =>
                <Buy key={index} buy={buy} theme={theme} />
            )}
        </View>
    )
}

const Buy = ({ buy, theme }: { buy: ISellBuy, theme: any }) => {
    return (
        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <View style={[styles.slider, { width: buy.percent + '%', backgroundColor: theme.green2, }]} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.txtPrice}>
                        {numberCommasDot(buy.price)}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.txtTotal, { color: theme.black }]} numberOfLines={1}>
                        {kFormatter(buy.amount.toFixed(3))}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default BuyInto

const styles = StyleSheet.create({
    txtClose: {
        color: colors.grayBlue,
        fontFamily: fonts.M24,
    },
    txtTotal: {
        fontSize: 13,
        fontFamily: 'Myfont22-Regular'
    },
    txtPrice: {
        color: colors.greenCan,
        fontSize: 14,
        fontFamily: 'Myfont17-Regular'
    },
    content: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        width: '100%',
    },
    slider: {
        width: '100%',
        height: 20,
    },
    txtTitle: {
        fontFamily: fonts.SGM,
        color: colors.gray5,
    },
})