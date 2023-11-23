import { RootState } from "../store";

export const sideSpotSelector = (state: RootState) => state.spot.side

export const buysSpotSelector = (state: RootState) => state.spot.buys

export const totalSpotSelector = (state: RootState) => state.spot.total
 
export const coinsSpotSelector = (state: RootState) => state.spot.coins

export const priceSpotSelector = (state: RootState) => state.spot.price

export const sellsSpotSelector = (state: RootState) => state.spot.sells

export const walletSpotSelector = (state: RootState) => state.spot.wallet 

export const amountSpotSelector = (state: RootState) => state.spot.amount 

export const percentSpotSelector = (state: RootState) => state.spot.percent 

export const icebergSpotSelector = (state: RootState) => state.spot.iceberg

export const loadingSpotSelector = (state: RootState) => state.spot.loading

export const typeTradeSpotSelector = (state: RootState) => state.spot.typeTrade

export const totalAmountSpotSelector = (state: RootState) => state.spot.totalAmount

export const coinChoosedSpotSelector = (state: RootState) => state.spot.coinChoosed 

export const icebergAmountSpotSelector = (state: RootState) => state.spot.icebergAmount