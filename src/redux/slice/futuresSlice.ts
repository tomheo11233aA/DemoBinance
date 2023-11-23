import { cancelOpenOrderThunk, closeMarketFutureAllThunk, closeMarketFutureThunk, getChartFuturesThunk, getPositionThunk, getTotalBuyThunk, getTotalSellThunk, leverAdjustmentAPIThunk } from "@asyncThunk/futuresAsyncThunk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ICoins, IFeeOrderFuture, IPositions, ISellBuy, ITpslPosition, ITriggerTPSL } from "src/model/futuresModel";
import { WritableDraft } from "immer/dist/internal";
import { ITimeLimit } from "src/model/tradeModel";
import { convertTimeGetChart } from "@method/format";

interface IfuturesSlice {
    loading: boolean,
    positions: IPositions[];
    position: IPositions | null;
    PNL: number;
    charts: IChart[];
    candles: IChart[];
    maxHighItem: any;
    minLowItem: any;
    heighValueChart: number;
    coins: ICoins[];
    symbol: string;
    currency: string;
    USDT: boolean;
    sells: ISellBuy[];
    buys: ISellBuy[];
    sellPrice: number | string;
    colorSellPrice: string;
    regime: 'Cross' | 'Isolated';
    typeTrade: 'Limit' | 'Market';
    side: 'buy' | 'sell';
    price: number | string;
    core: number;
    amount: number | string;
    leverAdjustment: {
        showModal: boolean;
        core: number;
        idPosition: number;
        loading: boolean;
    };
    dPathMA: {
        ma7: string;
        ma25: string;
        ma99: string;
    };
    countCandles: number;
    timeLimit: ITimeLimit;
    listTimeLimit: ITimeLimit[];
    closeTimestamp: number;
    countDown: number;
    stopProfit: {
        showModal: boolean;
        position: IPositions | null;
    },
    sliderListen: boolean;
    tp: number | string;
    sl: number | string;
    triggerTPSL: ITriggerTPSL;
    tpslPosition: ITpslPosition;
    loadingHistoryFuture: boolean;
    fee: number[],
}

const initialState: IfuturesSlice = {
    loading: true,
    positions: [],
    position: null,
    PNL: 0,
    charts: [],
    candles: [],
    maxHighItem: null,
    minLowItem: null,
    heighValueChart: 0,
    sells: [],
    buys: [],
    sellPrice: 0,
    colorSellPrice: Colors.red3,
    coins: [],
    symbol: 'BTCUSDT',
    currency: 'BTC',
    USDT: false,
    regime: 'Cross',
    typeTrade: 'Market', // market is default
    side: 'buy',
    price: '',
    core: 1,
    amount: '',
    leverAdjustment: {
        showModal: false,
        core: 1,
        idPosition: -1,
        loading: false,
    },
    dPathMA: {
        ma7: '',
        ma25: '',
        ma99: '',
    },
    timeLimit: {},
    listTimeLimit: [],
    countCandles: 0,
    closeTimestamp: 0,
    countDown: 0,
    stopProfit: {
        showModal: false,
        position: null,
    },
    sliderListen: false,
    tp: '',
    sl: '',
    triggerTPSL: {
        tpsl: '',
        value: 'Mark',
        showOption: false,
    },
    tpslPosition: {
        position: null,
        showModal: false,
    },
    loadingHistoryFuture: false,
    fee: [0, 0],
}

const futuresSlice = createSlice({
    name: 'futures',
    initialState,
    reducers: {
        setTPSLPosition: (state, action: PayloadAction<ITpslPosition>) => {
            state.tpslPosition = action.payload
        },
        setTriggerTPSL: (state, action: PayloadAction<ITriggerTPSL>) => {
            state.triggerTPSL = action.payload
        },
        setTP: (state, action: PayloadAction<number | string>) => {
            state.tp = action.payload
        },
        setSL: (state, action: PayloadAction<number | string>) => {
            state.sl = action.payload
        },
        setTimeLimit: (state, action: PayloadAction<ITimeLimit>) => {
            state.timeLimit = action.payload
            state.loading = true
        },
        setListTimeLimit: (state, action: PayloadAction<ITimeLimit[]>) => {
            state.listTimeLimit = action.payload
            state.timeLimit = action.payload[0]
        },
        setPNL: (state, action: PayloadAction<number>) => {
            state.PNL = action.payload
        },
        setPosition: (state, action: PayloadAction<IPositions | null>) => {
            state.position = action.payload
        },
        setChartItem: (state, action: PayloadAction<any>) => {
            state.charts[state.charts.length - 1] = action.payload
            state.candles[state.candles.length - 1] = action.payload
        },
        setCoins: (state, action: PayloadAction<ICoins[]>) => {
            state.coins = action.payload
        },
        setLeverAdjustment: (state, { payload }) => {
            state.leverAdjustment = payload
        },
        setRegime: (state, action: PayloadAction<'Cross' | 'Isolated'>) => {
            state.regime = action.payload
        },
        setCore: (state, action: PayloadAction<number>) => {
            state.core = action.payload
            state.amount = '0'
            state.sliderListen = !state.sliderListen
        },
        setSide: (state, action: PayloadAction<'buy' | 'sell'>) => {
            state.side = action.payload
        },
        setTypeTrade: (state, action: PayloadAction<'Limit' | 'Market'>) => {
            state.typeTrade = action.payload
        },
        setPrice: (state, action: PayloadAction<number | string>) => {
            state.price = action.payload
        },
        refreshWhenOrderFuture: (state) => {
            state.amount = ''
            state.sliderListen = !state.sliderListen
            state.price = state.coins.filter(coin => coin.symbol === state.symbol)[0].close
        },
        setSymbol: (state, action: PayloadAction<{ symbol: string, currency: string }>) => {
            state.symbol = action.payload.symbol
            state.currency = action.payload.currency
        },
        setSymbolLoading: (state, action: PayloadAction<{ symbol: string, currency: string }>) => {
            state.symbol = action.payload.symbol
            state.currency = action.payload.currency
            state.loading = true
        },
        setUSDT: (state, action: PayloadAction<boolean>) => {
            state.USDT = action.payload
            state.amount = ''
            state.sliderListen = !state.sliderListen
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setAmount: (state, action: PayloadAction<number | string>) => {
            state.amount = action.payload
        },
        setSells: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'sell')
        },
        setBuys: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'buy')
        },
        setChartFromAPI: (state, { payload }: PayloadAction<any>) => {
            state.countCandles = 0
            state.charts = payload.arr
            state.candles = payload.arr.slice(payload.arr.length - payload.size_chart, payload.arr.length)
            state.closeTimestamp = state.charts[state.charts.length - 1]?.closeTimestamp
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

                        state.charts.push(data)
                        state.candles.push(data)
                        state.charts.shift()
                        state.candles.shift()
                    } else {
                        data = {
                            ...data,
                            close: payload.close,
                            open: state.candles[state.candles.length - 2].close,
                            high: payload.close > lastChart.high ? payload.close : lastChart.close,
                            low: payload.close < lastChart.low ? payload.close : lastChart.low
                        }

                        state.charts[state.charts.length - 1] = data
                        state.candles[state.candles.length - 1] = data
                    }
                    break
                }
            }
            handleSetChart(state, payload)
        },
        chartTranslate: (state, { payload }) => {
            if (state.countCandles >= 395) return
            if ((state.countCandles + state.candles.length) >= state.charts.length) return
            state.countCandles++
            const item = state.charts[state.charts.length - (state.candles.length + state.countCandles)]
            state.candles.unshift(item)
            state.candles.pop()

            handleSetChart(state, payload)
        },
        chartTranslateReveser: (state, { payload }) => {
            if (state.countCandles === 0) return
            state.countCandles--
            const item = state.charts[state.charts.length - (state.candles.length + state.countCandles) + state.candles.length - 1]
            state.candles.push(item)
            state.candles.shift()

            handleSetChart(state, payload)
        },
        setZoom: (state, { payload }) => {
            if (state.candles.length < 1) return
            const section = payload.heigh_candle / state.heighValueChart
            let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
            const SIZE = state.charts.length - state.candles.length
            state.candles.map((item: IChart, index: number) => {
                if (index === 0) {
                    for (let i = (SIZE - state.countCandles); i > (SIZE - 99 - state.countCandles); i--) {
                        const close = Number(state.charts[i]?.close)
                        sumMA99 += close
                        if ((SIZE - i - state.countCandles) < 7) sumMA7 += close
                        if ((SIZE - i - state.countCandles) < 25) sumMA25 += close
                    }
                } else {
                    const firtValueSumMA7 = Number(state.charts[SIZE + index - 7 - state.countCandles]?.close)
                    const firtValueSumMA25 = Number(state.charts[SIZE + index - 25 - state.countCandles]?.close)
                    const firtValueSumMA99 = Number(state.charts[SIZE + index - 99 - state.countCandles]?.close)
                    const current = Number(state.candles[index]?.close)
                    sumMA7 = sumMA7 - firtValueSumMA7 + current
                    sumMA25 = sumMA25 - firtValueSumMA25 + current
                    sumMA99 = sumMA99 - firtValueSumMA99 + current
                }

                let dma7 = payload.heigh_candle - ((sumMA7 / 7 - state.minLowItem.low) * section)
                let dma25 = payload.heigh_candle - ((sumMA25 / 25 - state.minLowItem.low) * section)
                let dma99 = payload.heigh_candle - ((sumMA99 / 99 - state.minLowItem.low) * section)

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
        setStopProfit: (state, { payload }) => {
            state.stopProfit = payload
        },
        setFee: (state, { payload }) => {
            state.fee = payload
        }
    },
    extraReducers: builder => {
        builder.
            addCase(getPositionThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.positions = payload.data
                    state.core = state.positions.filter(item => item.symbol == state.symbol)[0]?.core || 1
                } else {
                    state.positions = []
                    state.core = 1
                }
            }).addCase(getChartFuturesThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.charts = payload.charts
                    state.candles = payload.candles
                    state.maxHighItem = payload.maxHighItem
                    state.minLowItem = payload.minLowItem
                    state.heighValueChart = payload.heighValueChart
                    state.dPathMA = payload.dPathMA
                }
            }).addCase(closeMarketFutureAllThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.PNL = 0
                    state.core = 1
                }
            }).addCase(closeMarketFutureThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.PNL = 0
                }
            }).addCase(leverAdjustmentAPIThunk.pending, (state) => {
                state.leverAdjustment.loading = true
            }).addCase(leverAdjustmentAPIThunk.fulfilled, (state, { payload }) => {
                state.leverAdjustment.loading = false
                if (payload.status) {
                    state.leverAdjustment.showModal = false
                    state.leverAdjustment.idPosition = -1
                    state.leverAdjustment.core = payload.core
                }
            }).addCase(getTotalSellThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    setSellOrBuy(state, payload.data.array, 'sell')
                }
            }).addCase(getTotalBuyThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    setSellOrBuy(state, payload.data.array, 'buy')
                }
            }).addCase(cancelOpenOrderThunk.pending, (state) => {
                state.loadingHistoryFuture = true
            })
            .addCase(cancelOpenOrderThunk.fulfilled, (state) => {
                state.loadingHistoryFuture = false
            })
    }
})

const handleSetChart = (state: WritableDraft<IfuturesSlice>, payload: any) => {
    let [maxHighItem, minLowItem]: any =
        [{ high: Number.MIN_SAFE_INTEGER }, { low: Number.MAX_SAFE_INTEGER }]

    for (let i = 0; i < state.candles.length; i++) {
        maxHighItem = state.candles[i]?.high >= maxHighItem?.high ?
            { ...state.candles[i], position: i } : maxHighItem

        minLowItem = state.candles[i]?.low <= minLowItem?.low ?
            { ...state.candles[i], position: i } : minLowItem
    }

    const heighChart = maxHighItem.high - minLowItem.low
    maxHighItem.high = Number(maxHighItem.high) + (heighChart / 6)
    minLowItem.low = minLowItem.low - (heighChart / 10)
    const heighValueChart = maxHighItem.high - minLowItem.low
    const section = payload.heigh_candle / heighValueChart

    let [dPathMA7, dPathMA25, dPathMA99, sumMA7, sumMA25, sumMA99] = ['', '', '', 0, 0, 0]
    const SIZE = state.charts.length - state.candles.length

    let candles = state.candles.map((item: IChart, index: number) => {
        let highSVG = payload.heigh_candle - ((item?.high - minLowItem.low) * section)
        let lowSVG = payload.heigh_candle - ((item?.low - minLowItem.low) * section)
        let closeSVG = payload.heigh_candle - ((item?.close - minLowItem.low) * section)
        let openSVG = payload.heigh_candle - ((item?.open - minLowItem.low) * section)
        let colorChart =
            item?.close >= item?.open ? colors.greenCan : colors.red3

        if (index === 0) {
            for (let i = (SIZE - state.countCandles); i > (SIZE - 99 - state.countCandles); i--) {
                const close = Number(state.charts[i]?.close)
                sumMA99 += close
                if ((SIZE - i - state.countCandles) < 7) sumMA7 += close
                if ((SIZE - i - state.countCandles) < 25) sumMA25 += close
            }
        } else {
            const firtValueSumMA7 = Number(state.charts[SIZE + index - 7 - state.countCandles]?.close)
            const firtValueSumMA25 = Number(state.charts[SIZE + index - 25 - state.countCandles]?.close)
            const firtValueSumMA99 = Number(state.charts[SIZE + index - 99 - state.countCandles]?.close)
            const current = Number(item?.close)
            sumMA7 = sumMA7 - firtValueSumMA7 + current
            sumMA25 = sumMA25 - firtValueSumMA25 + current
            sumMA99 = sumMA99 - firtValueSumMA99 + current
        }

        let dma7 = payload.heigh_candle - ((sumMA7 / 7 - minLowItem.low) * section) || 0
        let dma25 = payload.heigh_candle - ((sumMA25 / 25 - minLowItem.low) * section) || 0
        let dma99 = payload.heigh_candle - ((sumMA99 / 99 - minLowItem.low) * section) || 0

        const char = index === 0 ? 'M' : 'L'
        dPathMA7 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma7}`
        dPathMA25 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma25}`
        dPathMA99 += `${char}${payload.gap_candles * index - payload.padding_right_candle} ${dma99}`

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

const setSellOrBuy = async (state: IfuturesSlice, array: any, type: 'sell' | 'buy') => {
    if (array.length > 0) {
        let price = 0
        if (state.coins.length > 0) {
            price = state.coins.filter(coin => coin.symbol === state.symbol)[0].close
        }
        const max_amount = Math.max.apply(Math, array.map((item: any) => item.amount))
        const min_amount = Math.min.apply(Math, array.map((item: any) => item.amount))
        const tb_amount = max_amount - min_amount

        if (type === 'sell') {
            state.colorSellPrice = array[0].price >= state.sellPrice ? colors.greenCan : colors.red3

            state.sellPrice = price < 10 ? price.toFixed(4) :
                (price > 9 && price < 51) ? price.toFixed(3) : price.toFixed(1)
        }

        array = array.sort((p1: any, p2: any) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
        array = array.map((item: any) => {
            return (
                {
                    ...item,
                    amount: item.amount * price,
                    price: price < 10 ? item.price.toFixed(4) :
                        (price > 9 && price < 51) ? item.price.toFixed(3) : item.price.toFixed(1),
                    percent: (item.amount - min_amount) * 100 / tb_amount
                }
            )
        })
        if (type === 'sell') {
            state.sells = array.slice(0, 7)
        } else {
            state.buys = array.slice(0, 7)
        }
    }
}

export default futuresSlice