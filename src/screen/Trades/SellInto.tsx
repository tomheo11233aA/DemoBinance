import { getTotalSellThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { kFormatter, numberCommasDot } from '@method/format'
import { coinChoosedSpotSelector, icebergSpotSelector, sellsSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { setSells } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import contants from '@util/contants'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import io from 'socket.io-client'
import { ISellBuy } from 'src/model/futuresModel'

const SellInto = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const sells = useAppSelector(sellsSpotSelector)
    const iceberg = useAppSelector(icebergSpotSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    
    const LIMIT = (typeTrade === 'Limit' && iceberg) ? 7
        : (typeTrade === 'Limit' && !iceberg) ? 6 : 5

    useEffect(() => {
        handleGetTotalSell()
    }, [])

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)
        newSocket.on(`${coinChoosed.symbol}SELL`, (data) => {
            dispatch(setSells(data))
        })

        return () => newSocket.disconnect()
    }, [coinChoosed])

    const handleGetTotalSell = async () => {
        const { payload } = await dispatch(
            getTotalSellThunk({
                limit: LIMIT,
                page: 1,
                symbol: coinChoosed.symbol,
            })
        )
    }

    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                <View>
                    <Text style={styles.txtTitle}>{t('Price')}</Text>
                    <Txt style={styles.txtTitle}>(USDT)</Txt>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.txtTitle}>{t('Amount')}</Text>
                    <Txt style={styles.txtTitle}>(USDT)</Txt>
                </View>
            </View>
            {sells.data.slice(0, LIMIT).map((sell: ISellBuy, index: number) =>
                <Sell key={index} sell={sell} theme={theme} />
            )}
            <Box alignCenter marginTop={5}>
                <Txt
                    fontFamily={'Myfont20-Regular'}
                    size={18}
                    color={sells.color}
                >
                    {numberCommasDot(sells?.price)}
                </Txt>
            </Box>
        </View>
    )
}

const Sell = ({ sell, theme }: { sell: ISellBuy, theme: any }) => {
    return (
        <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <View style={[styles.slider, { width: sell.percent + '%', backgroundColor: theme.red2 }]} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.txtPrice}>
                        {numberCommasDot(sell.price)}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.txtTotal, { color: theme.black }]} numberOfLines={1}>
                        {kFormatter(sell.amount.toFixed(3))}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SellInto

const styles = StyleSheet.create({
    txtTotal: {
        fontSize: 13, // 12
        fontFamily: 'Myfont22-Regular' // JR
    },
    txtPrice: {
        color: colors.redCan,
        fontSize: 14, // 12
        fontFamily: 'Myfont17-Regular' // JR
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
        backgroundColor: '#FFF5F6',
    },
    txtTitle: {
        color: colors.gray5,
        fontSize: 11,
    },
})