import { getTotalBuyThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { kFormatter, numberCommasDot } from '@method/format'
import BoxLine from '@reuse/BoxLine'
import { buysFuturesSelector, sellPriceFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ISellBuy } from 'src/model/futuresModel'

const BuyInto = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const buys = useAppSelector(buysFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const priceSell = useAppSelector(sellPriceFuturesSelector)

    useEffect(() => {
        handleGetTotalSell()
    }, [])

    const handleGetTotalSell = async () => {
        const { payload } = await dispatch(
            getTotalBuyThunk({
                limit: 7,
                page: 1,
                symbol,
            })
        )
    }

    return (
        <View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <Box borderColor={colors.grayBlue}>
                    <BoxLine
                        title={numberCommasDot(priceSell)}
                        color={colors.grayBlue}
                        size={12.5}
                        size2={12.5}
                        font={'Myfont20-Regular'}
                        bottom={0}
                        numberOfLines={1}
                    />
                </Box>
            </View>
            {buys.map((buy: ISellBuy, index: number) =>
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