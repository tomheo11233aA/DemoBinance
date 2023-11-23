import { getTotalSellThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { kFormatter, numberCommasDot } from '@method/format'
import { colorSellPriceFuturesSelector, sellPriceFuturesSelector, sellsFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { ISellBuy } from 'src/model/futuresModel'

const SellInto = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const symbol = useAppSelector(symbolFuturesSelector)
    const sells = useAppSelector(sellsFuturesSelector)
    const sellPrice = useAppSelector(sellPriceFuturesSelector)
    const colorSellPrice = useAppSelector(colorSellPriceFuturesSelector)

    useEffect(() => {
        handleGetTotalSell()
    }, [])

    const handleGetTotalSell = async () => {
        const { payload } = await dispatch(
            getTotalSellThunk({
                limit: 7,
                page: 1,
                symbol,
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
            {sells.map((sell: ISellBuy, index: number) =>
                <Sell key={index} sell={sell} theme={theme} />
            )}
            <Box alignCenter marginTop={5}>
                <Txt
                    fontFamily={'Myfont20-Regular'}
                    size={18}
                    color={colorSellPrice}
                >
                    {numberCommasDot(sellPrice)}
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