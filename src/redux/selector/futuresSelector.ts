import { RootState } from "../store";

export const positionsFuturesSelector = (state: RootState) => state.futures.positions

export const PNLFuturesSelector = (state: RootState) => state.futures.PNL

export const positionFuturesSelector = (state: RootState) => state.futures.position

export const candlesFuturesSelector = (state: RootState) => state.futures.candles

export const maxHighItemFuturesSelector = (state: RootState) => state.futures.maxHighItem

export const minLowItemFuturesSelector = (state: RootState) => state.futures.minLowItem

export const heighValueChartFuturesSelector = (state: RootState) => state.futures.heighValueChart

export const coinsFuturesChartSelector = (state: RootState) => state.futures.coins

export const dPathMAFuturesSelector = (state: RootState) => state.futures.dPathMA

export const leverAdjustmentFuturesSelectoe = (state: RootState) => state.futures.leverAdjustment

export const regimeFuturesSelector = (state: RootState) => state.futures.regime

export const coreFuturesSelector = (state: RootState) => state.futures.core

export const sideFuturesSelector = (state: RootState) => state.futures.side

export const typeTradeFuturesSelector = (state: RootState) => state.futures.typeTrade

export const priceFuturesSelector = (state: RootState) => state.futures.price

export const symbolFuturesSelector = (state: RootState) => state.futures.symbol

export const currencyFuturesSelector = (state: RootState) => state.futures.currency

export const USDTFuturesSelector = (state: RootState) => state.futures.USDT

export const amountFuturesSelector = (state: RootState) => state.futures.amount

export const sellsFuturesSelector = (state: RootState) => state.futures.sells

export const sellPriceFuturesSelector = (state: RootState) => state.futures.sellPrice

export const colorSellPriceFuturesSelector = (state: RootState) => state.futures.colorSellPrice

export const buysFuturesSelector = (state: RootState) => state.futures.buys

export const loadingFuturesSelector = (state: RootState) => state.futures.loading 

export const timeLimitFuturesSelector = (state: RootState) => state.futures.timeLimit

export const listTimeLimitFuturesSelector = (state: RootState) => state.futures.listTimeLimit

export const countCandlesFuturesSelector = (state: RootState) => state.futures.countCandles

export const stopProfitFuturesSelector = (state: RootState) => state.futures.stopProfit

export const sliderListenFutureSelector = (state: RootState) => state.futures.sliderListen 

export const tpFutureSelector = (state: RootState) => state.futures.tp

export const slFutureSelector = (state: RootState) => state.futures.sl

export const triggerTPSLFutureSelector = (state: RootState) => state.futures.triggerTPSL

export const tpslPositionFutureSelector = (state: RootState) => state.futures.tpslPosition

export const loadingHistoryFutureSelector = (state: RootState) => state.futures.loadingHistoryFuture 

export const feeFuturesSelector = (state: RootState) => state.futures.fee