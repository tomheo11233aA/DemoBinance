import { RootState } from "../store";

export const listUserTraderCopyTradeSelector = (state: RootState) => state.copyTrade.listUserTrader

export const positionToTraderCopyTraderSelector = (state: RootState) => state.copyTrade.positionToTrader

export const hotTraderCopyTradeSelector = (state: RootState) => state.copyTrade.hotTrader 

export const dayChoosedCopyTradeSelector = (state: RootState) => state.copyTrade.dayChoosed

export const showModalListDayCopyTradeSelector = (state: RootState) => state.copyTrade.showModalListDay 

export const listCopiersCopyTradeSelector = (state: RootState) => state.copyTrade.listCopiers

export const futureTraderCopyTradeSelector = (state: RootState) => state.copyTrade.futureTrader 

export const listPositionCloseCopyCopyTradeSelector = (state: RootState) => state.copyTrade.listPositionCloseCopy 

export const historyOrderCopyCopyTradeSelector = (state: RootState) => state.copyTrade.historyOrderCopy

export const copyingTraderCopyTradeSelector = (state: RootState) => state.copyTrade.copyingTrader

export const listCancelCopyTraderSelector = (state: RootState) => state.copyTrade.listCancelCopyTrader 