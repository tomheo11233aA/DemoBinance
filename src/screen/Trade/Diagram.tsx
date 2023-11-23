import { useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { convertTimeGetChart } from "@method/format"
import LogoChart from "@screen/Futures/LogoChart"
import { symbolFuturesSelector } from "@selector/futuresSelector"
import { candlesTradeSelector, closeTimestampTradeSelector, countCandlesTradeSelector, countDownTradeSelector, dPathMATradeSelector, heighValueChartTradeSelector, maxHighItemTradeSelector, minLowItemTradeSelector, timeLimitSelector } from "@selector/tradeSelector"
import { getChart } from "@service/tradeService"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import contants from "@util/contants"
import { height, width } from "@util/responsive"
import { useEffect } from "react"
import { AppState, AppStateStatus, StyleSheet } from "react-native"
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated"
import { G, Svg } from "react-native-svg"
import { io } from "socket.io-client"
import { ICoins } from "src/model/futuresModel"
import Candles from "./Candles"
import Cursor from "./Cursor"
import LineX from "./LineX"
import MinMaxLowHigh from "./MinMaxLowHigh"
import PathMA from "./PathMA"

const height_container = height * 35 / 100
export const heigh_candle = height_container - 40
export const paddingTop = 20
export const size_chart = 50
const gap_candle = width * 2.55 / 100
const width_candle = width * 2.052 / 100
const width_candles = (width * 2.55 / 100) * 30 - width_candle
const padding_right_candle = size_chart * gap_candle - width_candle - width_candles

export default () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector)
    const timeLimit = useAppSelector(timeLimitSelector)
    const closeTimeStamp = useAppSelector(closeTimestampTradeSelector)
    const candles = useAppSelector(candlesTradeSelector)
    const minLowItem = useAppSelector(minLowItemTradeSelector)
    const maxHighItem = useAppSelector(maxHighItemTradeSelector)
    const heighValueChart = useAppSelector(heighValueChartTradeSelector)
    const dPathMA = useAppSelector(dPathMATradeSelector)
    const countDown = useAppSelector(countDownTradeSelector)
    const countCandles = useAppSelector(countCandlesTradeSelector)

    const count = useSharedValue(0)
    const scaleCount = useSharedValue(0)
    const scaleSum = useSharedValue(2)
    const widthCandle = useSharedValue(width_candle)
    const gapCandle = useSharedValue(gap_candle)
    const paddingRightCandles = useSharedValue(padding_right_candle)

    useEffect((): any => {
        handleGetChart()

        const newSocket = io(contants.HOSTING_CHART)

        let close = 0
        newSocket.on('listCoin', (coins: ICoins[]) => {
            if (coins.length > 0) {
                for (let i = 0; i < coins.length; i++) {
                    if (coins[i].symbol === symbol) {
                        close = coins[i].close
                        break
                    }
                }
            }
        })

        newSocket.on(`${symbol}UPDATESPOT`, data => {
            if (data.length > 0) {
                dispatch(tradeSlice.actions.setChart({
                    close,
                    size_chart,
                    paddingTop,
                    heigh_candle,
                    dataSocket: data,
                    gap_candle: gapCandle.value,
                    padding_right_candle: paddingRightCandles.value,
                }))
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
    }, [])

    const handleGetChart = async () => {
        let time = 1 * 60
        if (timeLimit.timeString) {
            time = convertTimeGetChart(timeLimit.timeString)
        }
        const res = await getChart({
            limit: 500,
            symbol: symbol,
            time: time,
        })
        if (res.status) {
            dispatch(tradeSlice.actions.setChartFromAPI({
                arr: res.data.array,
                size_chart,
                heigh_candle,
                paddingTop,
                gap_candle: gapCandle.value,
                padding_right_candle: paddingRightCandles.value,
            }))
        }
    }

    const handChartTranslate = () => {
        dispatch(tradeSlice.actions.chartTranslate({
            size_chart,
            heigh_candle,
            gap_candle: gapCandle.value,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
        }))
    }

    const handleChartTranslateReveser = () => {
        dispatch(tradeSlice.actions.chartTranslateReveser({
            size_chart,
            heigh_candle,
            gap_candle: gapCandle.value,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
        }))
    }

    const handleGestureEvent = useAnimatedGestureHandler({
        onActive(event, context) {
            if (event.velocityX >= 0) {
                count.value++
                if (count.value > 4) {
                    count.value = 0
                    runOnJS(handChartTranslate)()
                }
            } else {
                count.value--
                if (count.value < -4) {
                    count.value = 0
                    if (countCandles === 1) {
                        runOnJS(handleGetChart)()
                        return
                    }
                    runOnJS(handleChartTranslateReveser)()
                }
            }
        },
    })

    const handleZoom = () => {
        dispatch(tradeSlice.actions.setZoom({
            gap_candle: gapCandle.value,
            heigh_candle,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
        }))
    }

    const pinchHandle = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive(event, context) {
            if (event.velocity >= 0) {
                scaleCount.value++
                if (scaleCount.value > 5) {
                    scaleCount.value = 0
                    scaleSum.value = (scaleSum.value + 1 <= 10) ? (scaleSum.value + 1) : 10
                    gapCandle.value = width * (scaleSum.value + 0.55) / 100
                    widthCandle.value = width * (scaleSum.value + 0.052) / 100
                    paddingRightCandles.value = size_chart * gapCandle.value - widthCandle.value - width_candles
                    runOnJS(handleZoom)()
                }
            } else {
                scaleCount.value--
                if (scaleCount.value < -5) {
                    scaleCount.value = 0
                    scaleSum.value = (scaleSum.value - 1 >= 1) ? (scaleSum.value - 1) : 1
                    gapCandle.value = width * (scaleSum.value + 0.55) / 100
                    widthCandle.value = width * (scaleSum.value + 0.052) / 100
                    paddingRightCandles.value = size_chart * gapCandle.value - widthCandle.value - width_candles
                    runOnJS(handleZoom)()
                }
            }
        },
    })

    return (
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <Animated.View style={[styles.container, { borderColor: theme.line, }]}>
                <LogoChart height={height_container} />
                <PinchGestureHandler onGestureEvent={pinchHandle}>
                    <Animated.View>
                        {candles.length > 0 &&
                            <Svg>
                                <G key={'G'}>
                                    <LineX
                                        {...{
                                            theme,
                                            paddingTop,
                                            maxHighItem,
                                            heigh_candle,
                                            heighValueChart,
                                        }}
                                    />

                                    <Candles
                                        {...{
                                            theme,
                                            candles,
                                            gap_candle: gapCandle.value,
                                            paddingTop,
                                            width_candle: widthCandle.value,
                                            height_container,
                                            padding_right_candle: paddingRightCandles.value,
                                        }}
                                    />
                                    <MinMaxLowHigh
                                        {...{
                                            candles,
                                            size_chart,
                                            gap_candle: gapCandle.value,
                                            minLowItem,
                                            maxHighItem,
                                            padding_right_candle: paddingRightCandles.value,
                                        }}
                                    />
                                    <PathMA {...{ dPathMA }} />
                                </G>
                                <Cursor
                                    {...{
                                        theme,
                                        candles,
                                        countDown,
                                        size_chart,
                                        gap_candle: gapCandle.value,
                                        padding_right_candle: paddingRightCandles.value,
                                    }}
                                />
                            </Svg>
                        }
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height_container,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.line,
    }
})