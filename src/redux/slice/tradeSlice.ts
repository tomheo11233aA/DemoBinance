import { convertTimeGetChart } from "@method/format";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { WritableDraft } from "immer/dist/internal";
import { ITimeLimit, Trade } from "src/model/tradeModel";

interface ITradeSlice {
    loading: boolean;
    dataTrade: Trade[];
    charts: IChart[];
    candles: any;
    highChart: number
    lowChart: number;
    chartItem: Trade | {};
    positionsTotal: number;
    bestAsk: number;
    typeCoin2: string;
    maxHighItem: any;
    minLowItem: any;
    heighValueChart: number;
    countCandles: number,
    scaleCandles: number,
    dPathMA: {
        ma7: string;
        ma25: string;
        ma99: string;
    };
    countDown: number;
    timeLimit: ITimeLimit;
    closeTimestamp: number;
    listTimeLimit: ITimeLimit[];
}

const initialState: ITradeSlice = {
    loading: false,
    dataTrade: [],
    candles: [],
    charts: [],
    highChart: Number.MIN_VALUE,
    lowChart: Number.MAX_VALUE,
    chartItem: {},
    positionsTotal: 0,
    bestAsk: 0,
    typeCoin2: 'BTC',
    maxHighItem: null,
    minLowItem: null,
    heighValueChart: 0,
    countCandles: 0,
    scaleCandles: 0,
    dPathMA: {
        ma7: '',
        ma25: '',
        ma99: '',
    },
    timeLimit: {},
    closeTimestamp: 0,
    listTimeLimit: [],
    countDown: 0,
}

const tradeSlice = createSlice({
    name: 'trade',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setTimeLimit: (state, action: PayloadAction<ITimeLimit>) => {
            state.timeLimit = action.payload
            state.loading = true
        },
        setListTimeLimit: (state, action: PayloadAction<ITimeLimit[]>) => {
            state.listTimeLimit = action.payload
            state.timeLimit = action.payload[0]
        },
        setTypeCoin2: (state, action: PayloadAction<string>) => {
            state.typeCoin2 = action.payload
        },
        setPositions: (state, action: PayloadAction<number>) => {
            state.positionsTotal = action.payload
        },
        setBestAsk: (state, action: PayloadAction<number>) => {
            state.bestAsk = action.payload
        },
        setChartFromAPI: (state, { payload }: PayloadAction<any>) => {
            state.countCandles = 0
            state.dataTrade = payload.arr
            state.candles = payload.arr.slice(payload.arr.length - payload.size_chart, payload.arr.length)
            state.closeTimestamp = state.dataTrade[state.dataTrade.length - 1]?.closeTimestamp
            handleSetChart(state, payload)
        },
        setChart: (state, { payload }) => {
            if (state.countCandles !== 0 || state.candles.length === 0) return
            const timeCurrency = Number((Date.now() / 1000).toFixed(0))
            state.countDown = state.closeTimestamp - timeCurrency + 3
            for (let index = 0; index < payload.dataSocket.length; index++) {
                if (payload.dataSocket[index].timeString === state.timeLimit.timeString) {
                    let data = payload.dataSocket[index]
                    if (state.countDown < 1) {
                        if (state.timeLimit.timeString) state.closeTimestamp += convertTimeGetChart(state.timeLimit.timeString)
                    }
                    const lastChart = state.candles[state.candles.length - 1]
                    if (data.closeTimestamp != lastChart.closeTimestamp) {
                        data = {
                            ...data,
                            open: lastChart.close,
                            high: lastChart.close,
                            low: lastChart.close,
                            close: lastChart.close,
                        }

                        state.dataTrade.push(data)
                        state.candles.push(data)
                        state.dataTrade.shift()
                        state.candles.shift()

                    } else {
                        data = {
                            ...data,
                            close: payload.close,
                            open: state.candles[state.candles.length - 2].close,
                            high: payload.close > lastChart.high ? payload.close : lastChart.close,
                            low: payload.close < lastChart.low ? payload.close : lastChart.low
                        }

                        state.dataTrade[state.dataTrade.length - 1] = data
                        state.candles[state.candles.length - 1] = data
                    }
                    break
                }
            }
            handleSetChart(state, payload)
        },
        chartTranslate: (state, { payload }) => { 
            if (state.countCandles >= 395) return 
            if ((state.countCandles + state.candles.length) >= state.dataTrade.length) return
            state.countCandles++
            const item = state.dataTrade[state.dataTrade.length - (state.candles.length + state.countCandles)]
            state.candles.unshift(item)
            state.candles.pop()

            handleSetChart(state, payload)
        },
        chartTranslateReveser: (state, { payload }) => {
            if (state.countCandles === 0) return
            state.countCandles--
            const item = state.dataTrade[state.dataTrade.length - (state.candles.length + state.countCandles) + state.candles.length - 1]
            state.candles.push(item)
            state.candles.shift()

            handleSetChart(state, payload)
        },
        setZoom: (state, { payload }) => {
            if (state.candles.length < 1) return
            const section = payload.heigh_candle / state.heighValueChart
            let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
            const SIZE = state.dataTrade.length - state.candles.length
            state.candles.map((item: IChart, index: number) => {
                if (index === 0) {
                    for (let i = (SIZE - state.countCandles); i > (SIZE - 99 - state.countCandles); i--) {
                        const close = Number(state.dataTrade[i]?.close)
                        sumMA99 += close
                        if ((SIZE - i - state.countCandles) < 7) sumMA7 += close
                        if ((SIZE - i - state.countCandles) < 25) sumMA25 += close
                    }
                } else {
                    const firtValueSumMA7 = Number(state.dataTrade[SIZE + index - 7 - state.countCandles]?.close)
                    const firtValueSumMA25 = Number(state.dataTrade[SIZE + index - 25 - state.countCandles]?.close)
                    const firtValueSumMA99 = Number(state.dataTrade[SIZE + index - 99 - state.countCandles]?.close)
                    const current = Number(state.candles[index]?.close)
                    sumMA7 = sumMA7 - firtValueSumMA7 + current
                    sumMA25 = sumMA25 - firtValueSumMA25 + current
                    sumMA99 = sumMA99 - firtValueSumMA99 + current
                }

                let dma7 = payload.heigh_candle - ((sumMA7 / 7 - state.minLowItem.low) * section) + payload.paddingTop
                let dma25 = payload.heigh_candle - ((sumMA25 / 25 - state.minLowItem.low) * section) + payload.paddingTop
                let dma99 = payload.heigh_candle - ((sumMA99 / 99 - state.minLowItem.low) * section) + payload.paddingTop

                const char = index === 0 ? 'M' : 'L'
                dPathMA7 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma7}`
                dPathMA25 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma25}`
                dPathMA99 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma99}`
            })

            state.dPathMA = {
                ma7: dPathMA7,
                ma25: dPathMA25,
                ma99: dPathMA99,
            }
        },
    },
})

export default tradeSlice

const handleSetChart = (state: WritableDraft<ITradeSlice>, payload: any) => {
    let [maxHighItem, minLowItem]: any =
        [{ high: Number.MIN_SAFE_INTEGER }, { low: Number.MAX_SAFE_INTEGER }]

    for (let i = 0; i < state.candles.length; i++) {
        maxHighItem = state.candles[i]?.high >= maxHighItem?.high ?
            { ...state.candles[i], position: i } : maxHighItem

        minLowItem = state.candles[i]?.low <= minLowItem?.low ?
            { ...state.candles[i], position: i } : minLowItem
    }

    const heighChart = maxHighItem.high - minLowItem.low
    maxHighItem.high = Number(maxHighItem.high) + (heighChart / 10)
    minLowItem.low = minLowItem.low - (heighChart / 10)
    const heighValueChart = maxHighItem.high - minLowItem.low
    const section = payload.heigh_candle / heighValueChart

    let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
    const SIZE = state.dataTrade.length - state.candles.length

    let candles = state.candles.map((item: IChart, index: number) => {
        let highSVG = payload.heigh_candle - ((item?.high - minLowItem.low) * section) + payload.paddingTop
        let lowSVG = payload.heigh_candle - ((item?.low - minLowItem.low) * section) + payload.paddingTop
        let closeSVG = payload.heigh_candle - ((item?.close - minLowItem.low) * section) + payload.paddingTop
        let openSVG = payload.heigh_candle - ((item?.open - minLowItem.low) * section) + payload.paddingTop
        let colorChart =
            item?.close >= item?.open ? colors.greenCan : colors.red3

        if (index === 0) {
            for (let i = (SIZE - state.countCandles); i > (SIZE - 99 - state.countCandles); i--) {
                const close = Number(state.dataTrade[i]?.close)
                sumMA99 += close
                if ((SIZE - i - state.countCandles) < 7) sumMA7 += close
                if ((SIZE - i - state.countCandles) < 25) sumMA25 += close
            }
        } else {
            const firtValueSumMA7 = Number(state.dataTrade[SIZE + index - 7 - state.countCandles]?.close)
            const firtValueSumMA25 = Number(state.dataTrade[SIZE + index - 25 - state.countCandles]?.close)
            const firtValueSumMA99 = Number(state.dataTrade[SIZE + index - 99 - state.countCandles]?.close)
            const current = Number(item?.close)
            sumMA7 = sumMA7 - firtValueSumMA7 + current
            sumMA25 = sumMA25 - firtValueSumMA25 + current
            sumMA99 = sumMA99 - firtValueSumMA99 + current
        }

        let dma7 = payload.heigh_candle - ((sumMA7 / 7 - minLowItem.low) * section) + payload.paddingTop || 0
        let dma25 = payload.heigh_candle - ((sumMA25 / 25 - minLowItem.low) * section) + payload.paddingTop || 0
        let dma99 = payload.heigh_candle - ((sumMA99 / 99 - minLowItem.low) * section) + payload.paddingTop || 0

        const char = index === 0 ? 'M' : 'L'
        dPathMA7 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma7}`
        dPathMA25 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma25}`
        dPathMA99 += `${char}${payload.gap_candle * index - payload.padding_right_candle} ${dma99}`

        return {
            ...item,
            highSVG,
            lowSVG,
            colorChart,
            closeSVG,
            openSVG,
            ma7: sumMA7 / 7,
            ma25: sumMA25 / 25,
            ma99: sumMA99 / 99,
        }
    })
    state.candles = candles
    state.maxHighItem = maxHighItem
    state.minLowItem = minLowItem
    state.heighValueChart = heighValueChart
    state.dPathMA = {
        ma7: dPathMA7,
        ma25: dPathMA25,
        ma99: dPathMA99,
    }
}