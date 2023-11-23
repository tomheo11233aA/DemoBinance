import { useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { symbolFuturesSelector } from '@selector/futuresSelector'
import { getTotalBuy } from '@service/tradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppState, AppStateStatus, StyleSheet, Text, View } from 'react-native'
import io from 'socket.io-client'
import { BuySell } from 'src/model/tradeModel'

const BuyInto = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [buys, setBuys] = useState<BuySell[]>([])
    const symbol = useAppSelector(symbolFuturesSelector)

    useEffect((): any => {
        if (buys.length === 0) {
            handleGetTotalBuy()
        }

        const newSocket = io(contants.HOSTING)
        newSocket.on(`${symbol}BUY`, (data) => {
            if (data.array) {
                setBuys(data.array.slice(0, 7))
            }
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
            // if (nextAppState === 'active') {
            //     newSocket.connect()
            // }
        });

        return () => newSocket.disconnect()
    }, [buys])

    const handleGetTotalBuy = async () => {
        const res = await getTotalBuy({
            limit: 7,
            page: 1,
            symbol: symbol,
        })
        if (res.status) {
            setBuys(res.data.array)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 10, marginBottom: 11, color: colors.grayBlue, fontSize: 11 }}>
                {t('Bid')}
            </Text>
            {buys.map((buy: BuySell, index: number) =>
                <Buy key={index} buy={buy} theme={theme} />
            )}
        </View>
    )
}

const Buy = ({ buy, theme }: { buy: BuySell, theme: any }) => {
    const rndInt = Math.floor(Math.random() * 35) + 30

    return (
        <View style={{ alignItems: 'flex-end' }}>
            <View style={[styles.slider, { width: rndInt + '%', backgroundColor: theme.green2 }]} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.txtTotal} numberOfLines={1}>
                        {numberCommasDot(buy?.amount?.toFixed(5))}
                    </Text>
                </View>
                <View>
                    <Text style={styles.txtPrice}>
                        {numberCommasDot(buy?.price?.toFixed(2))}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default BuyInto

const styles = StyleSheet.create({
    txtTotal: {
        fontFamily: fonts.M17,
        fontSize: 13,
        color: colors.grayBlue,
    },
    txtPrice: {
        fontFamily: fonts.M17,
        fontSize: 13,
        color: colors.greenCan,
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        height: 22,
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        height: 22,
        backgroundColor: '#203538',
    },
    txtTitle: {
        fontSize: 12,
        fontFamily: fonts.FSCR,
        color: colors.grayBlue,
    },
})