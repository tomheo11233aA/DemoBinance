import { useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { convertTimeGetChart } from "@method/format"
import LogoChart from "@screen/Futures/LogoChart"
import { symbolFuturesSelector } from "@selector/futuresSelector"
import { candlesTradeSelector, countCandlesTradeSelector, countDownTradeSelector, dPathGreenTradeSelector, dPathMATradeSelector, dPathRedTradeSelector, heighValueChartTradeSelector, maxHighItemTradeSelector, minLowItemTradeSelector, timeLimitSelector } from "@selector/tradeSelector"
import { getChart } from "@service/tradeService"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import contants from "@util/contants"
import { height, width } from "@util/responsive"
import { useEffect } from "react"
import { AppState, AppStateStatus, InteractionManager, StyleSheet, View } from "react-native"
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated"
import { G, Svg, Path } from "react-native-svg"
import { io } from "socket.io-client"
import { ICoins } from "src/model/futuresModel"
import Cursor from "./Cursor"
import LineX from "./LineX"
import MinMaxLowHigh from "./MinMaxLowHigh"
import PathMA from "./PathMA"
import React from "react"
import { WebView } from 'react-native-webview';
import { SafeAreaView } from "react-native"
import { ActivityIndicator } from "react-native"


export const height_container = height * 35 / 100
export const heigh_candle = height_container - 40
export const paddingTop = 20
export const size_chart = 50
const gap_candle = width * 2.55 / 100
const width_candle = width * 2.052 / 100
const width_candles = (width * 2.55 / 100) * 30 - width_candle
const padding_right_candle = size_chart * gap_candle - width_candle - width_candles
const Diagram = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector)
    const timeLimit = useAppSelector(timeLimitSelector)
    const candles = useAppSelector(candlesTradeSelector)
    const minLowItem = useAppSelector(minLowItemTradeSelector)
    const maxHighItem = useAppSelector(maxHighItemTradeSelector)
    const heighValueChart = useAppSelector(heighValueChartTradeSelector)
    const dPathMA = useAppSelector(dPathMATradeSelector)
    const countDown = useAppSelector(countDownTradeSelector)
    const countCandles = useAppSelector(countCandlesTradeSelector)
    const dPathGreen = useAppSelector(dPathGreenTradeSelector)
    const dPathRed = useAppSelector(dPathRedTradeSelector)
    const [data, setData] = React.useState<any>([])
    const count = useSharedValue(0)
    const scaleCount = useSharedValue(0)
    const scaleSum = useSharedValue(2)
    const widthCandle = useSharedValue(width_candle)
    const gapCandle = useSharedValue(gap_candle)
    const paddingRightCandles = useSharedValue(padding_right_candle)
    const newSocket = io(contants.HOSTING_CHART)

    useEffect((): any => {
        handleGetChart()

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
                    width_candle: widthCandle.value,
                    padding_right_candle: paddingRightCandles.value,
                }))
            }
        })

        newSocket.on(`${symbol}BUY`, (data) => {
            if (data.array) {
                dispatch(tradeSlice.actions.setBuys(data.array))
            }
        })

        newSocket.on(`${symbol}SELL`, (data) => {
            if (data.array) {
                dispatch(tradeSlice.actions.setSells(data.array))
            }
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
        })

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
            setData(res.data.array)
            dispatch(tradeSlice.actions.setChartFromAPI({
                arr: res.data.array,
                size_chart,
                heigh_candle,
                paddingTop,
                gap_candle: gapCandle.value,
                width_candle: widthCandle.value,
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
            width_candle: widthCandle.value,
        }))
    }

    const handleChartTranslateReveser = () => {
        dispatch(tradeSlice.actions.chartTranslateReveser({
            size_chart,
            heigh_candle,
            gap_candle: gapCandle.value,
            padding_right_candle: paddingRightCandles.value,
            paddingTop,
            width_candle: widthCandle.value,
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
            width_candle: widthCandle.value,
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

    const chartHtml = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
            body,
            html {
                margin: 0;
                padding: 0;
                height: 100%;
                overflow: hidden;
            }
    
            #chart {
                height: 100%;
            }
        </style>
        <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    </head>
    
    <body>
        <div id="chart"></div>
        <script>
            async function fetchData() {
                const response = await fetch('https://trade.dk-tech.vn/api/binaryOption/getChart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "limit": 500,
                        "symbol": "BTCUSDT",
                        "time": 60
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data.data.array;
            }
            function calculateMA(data, length) {
                let ma = [];
                for (let i = length - 1; i < data.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < length; j++) {
                        sum += data[i - j].close;
                    }
                    ma.push({ time: data[i].time, value: sum / length });
                }
                return ma;
            }
            async function initChart() {
                const chart = LightweightCharts.createChart(document.getElementById('chart'), {
                });
                chart.applyOptions({
                    crosshair: {
                        mode: LightweightCharts.CrosshairMode.Normal,
                        vertLine: {
                            visible: false,
                            labelVisible: false,
                        },
                        horzLine: {
                            visible: false,
                            labelVisible: false,
                        },
                        lastValueVisible: false,
                    },
                    // timeScale: {
                    //     tickMarkFormatter: (time, tickMarkType, locale) => {
                    //         const date = new Date(time);
                    //         if (date.getMinutes() % 5 === 0) {
                    //             return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    //         }
                    //         return '';
                    //     }
                    // },
                });
                chart.timeScale().applyOptions({
                    barSpacing: 10,
                    borderColor: '#d1d4dc',
                });
                const candleSeries = chart.addCandlestickSeries();
                candleSeries.applyOptions({
                    upColor: '#31bb86',
                    downColor: '#F36075',
                    borderVisible: false,
                    wickUpColor: '#31bb86',
                    wickDownColor: '#F36075',
                });
                const ma7Series = chart.addLineSeries({
                    color: '#fbd434',
                    lineWidth: 1,
                    priceLineVisible: false,
                    crosshairMarkerVisible: false,
                });
                const ma25Series = chart.addLineSeries({
                    color: '#a5448c',
                    lineWidth: 1,
                    priceLineVisible: false,
                    crosshairMarkerVisible: false,
                });
                const ma99Series = chart.addLineSeries({
                    color: '#7f70a0',
                    lineWidth: 1,
                    priceLineVisible: false,
                    crosshairMarkerVisible: false,
                });
                ma7Series.applyOptions({
                    lastValueVisible: false,
                });
                ma25Series.applyOptions({
                    lastValueVisible: false,
                });
                ma99Series.applyOptions({
                    lastValueVisible: false,
                });
                try {
                    setInterval(async () => {
                        const rawData = await fetchData();
                        const data = rawData.map(item => ({
                            time: Math.floor(item.time),
                            open: parseFloat(item.open),
                            high: parseFloat(item.high),
                            low: parseFloat(item.low),
                            close: parseFloat(item.close),
                        }));
                        const ma7 = calculateMA(data, 7);
                        const ma25 = calculateMA(data, 25);
                        const ma99 = calculateMA(data, 99);
    
                        ma7Series.setData(ma7);
                        ma25Series.setData(ma25);
                        ma99Series.setData(ma99);
                        candleSeries.setData(data);
                    }, 250);
                }
                catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
    
            initChart();
        </script>
    </body>
    
    
    </html>`

    return (
        // <PanGestureHandler onGestureEvent={handleGestureEvent}>
        //     <Animated.View style={[styles.container, { borderColor: theme.line, }]}>
        //         <LogoChart height={height_container} />
        //         <PinchGestureHandler onGestureEvent={pinchHandle}>
        //             <Animated.View>
        //                 {candles.length > 0 &&
        //                     <View>
        //                         <Svg>
        //                             <G key={'G'}>
        //                                 <LineX
        //                                     {...{
        //                                         theme,
        //                                         candles,
        //                                         maxHighItem,
        //                                         heighValueChart,
        //                                         gap_candle: gapCandle.value,
        //                                         padding_right_candle: paddingRightCandles.value,
        //                                     }}
        //                                 />

        //                                 <MinMaxLowHigh
        //                                     {...{
        //                                         candles,
        //                                         size_chart,
        //                                         gap_candle: gapCandle.value,
        //                                         minLowItem,
        //                                         maxHighItem,
        //                                         padding_right_candle: paddingRightCandles.value,
        //                                     }}
        //                                 />
        //                                 <PathMA {...{ dPathMA, dPathGreen, dPathRed }} />

        //                             </G>
        //                             <Cursor
        //                                 {...{
        //                                     theme,
        //                                     candles,
        //                                     countDown,
        //                                     size_chart,
        //                                     gap_candle: gapCandle.value,
        //                                     padding_right_candle: paddingRightCandles.value,
        //                                 }}
        //                             />
        //                         </Svg>
        //                     </View>
        //                 }
        //             </Animated.View>
        //         </PinchGestureHandler>
        //     </Animated.View>
        // </PanGestureHandler>
        <SafeAreaView style={{ flex: 1}}>
            <WebView
                originWhitelist={['*']}
                source={{ html: chartHtml }}
                scalesPageToFit={false}
                javaScriptEnabled={true}
            />
        </SafeAreaView>
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

export default React.memo(Diagram)