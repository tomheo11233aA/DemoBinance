import { createAsyncThunk } from "@reduxjs/toolkit"
import { cancelOpenOrder } from "@service/fundingService"
import { closeMarketFuture, getPosition, leverAdjustmentAPI } from "@service/futureService"
import { closeMarketFutureAll, getChart, getTotalBuy, getTotalSell } from "@service/tradeService"
import { colors } from "@theme/colors"
import { width } from "@util/responsive"
import { Trade } from "src/model/tradeModel"

const SIZE_CHART = 40
const MAX_SIZE_API = 200
const PADDING_RIGHT_CANDLE = SIZE_CHART * 2
const GAP_CANDLES = width * 2.55 / 100
const SIZE = MAX_SIZE_API - SIZE_CHART

export const getPositionThunk = createAsyncThunk('futures/getPosition', async (symbol: string) => {
    const res = await getPosition(symbol)
    return res
})

export const getChartFuturesThunk = createAsyncThunk('trade/getChartFutures', async (req: any) => {
    const res = await getChart(req)
    if (res.status) {
        let array = res.data.array
        let candles = array.slice(array.length - SIZE_CHART, array.length)
        // let candles: any = [
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "90",
        //         "high": "100",
        //         "low": "50",
        //         "open": "55",
        //         "volume": "2.03264000",
        //         "timestamp": 1685070420,
        //         "closeTimestamp": 1685070479,
        //         "time": 1685070420000
        //     },
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "75",
        //         "high": "100",
        //         "low": "40",
        //         "open": "50",
        //         "volume": "13.16307000",
        //         "timestamp": 1685070480,
        //         "closeTimestamp": 1685070539,
        //         "time": 1685070480000
        //     },
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "80",
        //         "high": "100",
        //         "low": "60",
        //         "open": "65",
        //         "volume": "2.03264000",
        //         "timestamp": 1685070420,
        //         "closeTimestamp": 1685070479,
        //         "time": 1685070420000
        //     },
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "75",
        //         "high": "120",
        //         "low": "75",
        //         "open": "50",
        //         "volume": "13.16307000",
        //         "timestamp": 1685070480,
        //         "closeTimestamp": 1685070539,
        //         "time": 1685070480000
        //     },
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "80",
        //         "high": "100",
        //         "low": "60",
        //         "open": "65",
        //         "volume": "2.03264000",
        //         "timestamp": 1685070420,
        //         "closeTimestamp": 1685070479,
        //         "time": 1685070420000
        //     },
        //     {
        //         "symbol": "BTCUSDT",
        //         "close": "90",
        //         "high": "100",
        //         "low": "75",
        //         "open": "50",
        //         "volume": "13.16307000",
        //         "timestamp": 1685070480,
        //         "closeTimestamp": 1685070539,
        //         "time": 1685070480000
        //     },
        // ]

        let [maxHighItem, minLowItem]: any =
            [{ high: Number.MIN_SAFE_INTEGER }, { low: Number.MAX_SAFE_INTEGER }]

        for (let i = 0; i < candles.length; i++) {
            maxHighItem = candles[i].high >= maxHighItem.high ?
                { ...candles[i], position: i } : maxHighItem

            minLowItem = candles[i].low <= minLowItem.low ?
                { ...candles[i], position: i } : minLowItem
        }

        const heighChart = maxHighItem.high - minLowItem.low
        maxHighItem.high = Number(maxHighItem.high) + (heighChart / 4)
        minLowItem.low = minLowItem.low - (heighChart / 10)
        const heighValueChart = maxHighItem.high - minLowItem.low
        const section = req.HEIGH_CANDLES / heighValueChart

        let [dPathMA7, dPathMA25, dPathMA99] = ['', '', '']

        candles = candles.map((item: Trade, index: number) => {
            let highSVG = req.HEIGH_CANDLES - ((item.high - minLowItem.low) * section)
            let lowSVG = req.HEIGH_CANDLES - ((item.low - minLowItem.low) * section)
            let closeSVG = req.HEIGH_CANDLES - ((item.close - minLowItem.low) * section)
            let openSVG = req.HEIGH_CANDLES - ((item.open - minLowItem.low) * section)
            let colorChart =
                Number(item.close) >= Number(item.open) ? colors.greenCan : colors.red3

            let [ma7, ma25, ma99] = [0, 0, 0]
            for (let i = (index + SIZE); i > (index + SIZE - 99); i--) {
                const close = Number(array[i].close)
                ma99 += close
                if ((index + SIZE - i) < 7) ma7 += close
                if ((index + SIZE - i) < 25) ma25 += close
            }
            ma7 /= 7
            ma25 /= 25
            ma99 /= 99
            let dma7 = req.HEIGH_CANDLES - ((ma7 - minLowItem.low) * section)
            let dma25 = req.HEIGH_CANDLES - ((ma25 - minLowItem.low) * section)
            let dma99 = req.HEIGH_CANDLES - ((ma99 - minLowItem.low) * section)

            if (index === 0) {
                dPathMA7 += `M${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma7}`
                dPathMA25 += `M${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma25}`
                dPathMA99 += `M${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma99}`
            } else {
                dPathMA7 += `L${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma7}`
                dPathMA25 += `L${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma25}`
                dPathMA99 += `L${GAP_CANDLES * index - PADDING_RIGHT_CANDLE} ${dma99}`
            }

            return (
                {
                    ...item,
                    highSVG: highSVG,
                    lowSVG: lowSVG,
                    colorChart,
                    closeSVG,
                    openSVG,
                    ma7,
                    ma25,
                    ma99,
                }
            )
        })

        return {
            ...res,
            charts: array,
            candles,
            maxHighItem,
            minLowItem,
            heighValueChart,
            dPathMA: {
                ma7: dPathMA7,
                ma25: dPathMA25,
                ma99: dPathMA99,
            }
        }
    }
    return res
})

export const closeMarketFutureThunk =
    createAsyncThunk('futures/closeMarketFuture', async (idFuture: number) => {
        const res = await closeMarketFuture(idFuture)
        return res
    })

export const closeMarketFutureAllThunk =
    createAsyncThunk('futures/closeMarketFutureAll', async () => {
        const res = await closeMarketFutureAll()
        return res
    })

export const leverAdjustmentAPIThunk =
    createAsyncThunk('futures/leverAdjustmentAPI', async (data: any) => {
        const res = await leverAdjustmentAPI(data)
        return { ...res, core: data.core }
    })

export const getTotalSellThunk =
    createAsyncThunk('futures/getTotalSell', async (data: any) => {
        const res = await getTotalSell(data)
        return res
    })

export const getTotalBuyThunk =
    createAsyncThunk('futures/getTotalBuy', async (data: any) => {
        const res = await getTotalBuy(data)
        return res
    })

export const cancelOpenOrderThunk =
    createAsyncThunk('futures/cancelOpenOrder', async (id: number) => {
        const res = await cancelOpenOrder(id)
        return res
    })


