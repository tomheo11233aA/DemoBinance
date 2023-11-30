import { RootState } from "../store";

export const dataTradeSelector = (state: RootState) => state.trade.dataTrade

export const highChartTradeSelector = (state: RootState) => state.trade.highChart

export const lowChartTradeSelector = (state: RootState) => state.trade.lowChart

export const chartItemTradeSelector = (state: RootState) => state.trade.chartItem

export const timeLimitSelector = (state: RootState) => state.trade.timeLimit

export const candlesTradeSelector = (state: RootState) => state.trade.candles

export const positionsTotalTradeSelector = (state: RootState) => state.trade.positionsTotal

export const bestAskTradeSelector = (state: RootState) => state.trade.bestAsk

export const typeCoin2TradeSelector = (state: RootState) => state.trade.typeCoin2 

export const maxHighItemTradeSelector = (state: RootState) => state.trade.maxHighItem

export const heighValueChartTradeSelector = (state: RootState) => state.trade.heighValueChart 

export const dPathMATradeSelector = (state: RootState) => state.trade.dPathMA

export const minLowItemTradeSelector = (state: RootState) => state.trade.minLowItem 

export const closeTimestampTradeSelector = (state: RootState) => state.trade.closeTimestamp 

export const listTimeLimitTradeSelector = (state: RootState) => state.trade.listTimeLimit 

export const loadingTradeSelector = (state: RootState) => state.trade.loading

export const countDownTradeSelector = (state: RootState) => state.trade.countDown

export const countCandlesTradeSelector = (state: RootState) => state.trade.countCandles

export const dPathGreenTradeSelector = (state: RootState) => state.trade.dPathGreen 

export const dPathRedTradeSelector = (state: RootState) => state.trade.dPathRed

export const buysTradeSelector = (state: RootState) => state.trade.buys

export const sellsTradeSelector = (state: RootState) => state.trade.sells 