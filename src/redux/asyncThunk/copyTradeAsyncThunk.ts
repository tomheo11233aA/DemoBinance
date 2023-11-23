import { createAsyncThunk } from "@reduxjs/toolkit"
import { getHistoryOrderCopy, getHistoryTradeToTrader, getListCancelCopyTrader, getListCopiers, getListCopyingTrader, getListPositionCloseCopy, getListUserTrader, getPositionToTrader } from "@service/copyTradeService"

export const getListUserTraderThunk =
    createAsyncThunk('copyTrade/getListUserTrader', async (data: any) => {
        const res = await getListUserTrader(data)
        return res
    })

export const getPositionToTraderThunk =
    createAsyncThunk('copyTrade/getPositionToTrader', async (userid: number | string) => {
        const res = await getPositionToTrader(userid)
        return res
    })

export const getListCopiersThunk =
    createAsyncThunk('copyTrade/getListCopiers', async (data: any) => {
        const res = await getListCopiers(data)
        return res
    })

export const getHistoryTradeToTraderThunk =
    createAsyncThunk('copyTrade/getHistoryTradeToTrader', async (data: any) => {
        const res = await getHistoryTradeToTrader(data)
        return res
    })

export const getListPositionCloseCopyThunk =
    createAsyncThunk('copyTrade/getListPositionCloseCopy', async (data: any) => {
        const res = await getListPositionCloseCopy(data)
        return res
    })

export const getHistoryOrderCopyThunk =
    createAsyncThunk('copyTrade/getHistoryOrderCopy', async (data: any) => {
        const res = await getHistoryOrderCopy(data)
        return res
    })

export const getListCopyingTraderThunk =
    createAsyncThunk('copyTrade/getListCopyingTrader', async (data: any) => {
        const res = await getListCopyingTrader(data)
        return res
    })

export const getListCancelCopyTraderThunk =
    createAsyncThunk('copyTrade/getListCancelCopyTrader', async (data: any) => {
        const res = await getListCancelCopyTrader(data)
        return res
    })

