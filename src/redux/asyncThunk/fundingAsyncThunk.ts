import { createAsyncThunk } from "@reduxjs/toolkit"
import { getBanking, getHistoryOpenOrder, getHistoryOpenOrderAll, getHistoryOrder, getListPositionClose } from "@service/fundingService"
import { checkTransactionDepositVnd, getChartStatisticsUser, getHistoryChangeBalance, getHistoryDeposit } from "@service/walletService"
import { banking } from "@util/banking"
import { ReqLimitPage } from "src/model/commomModel"
import { IReqHistoryOpenOrder } from "src/model/fundingModel"

export const getBankingThunk =
    createAsyncThunk('deposite/getBanking', async () => {
        const res = await getBanking()
        let data = []
        if (res.status) {
            for (let index = 0; index < res.data.length; index++) {
                for (let position = 0; position < banking.length; position++) {
                    if (res.data[index].name_banking === banking[position].name) {
                        data.push({ ...res.data[index], image: banking[position].image })
                        break
                    }
                }
            }
        }
        return { ...res, data }
    })

export const checkTransactionDepositVndThunk =
    createAsyncThunk('funding/checkTransactionDepositVnd', async () => {
        const res = await checkTransactionDepositVnd()
        return res
    })

export const getHistoryOpenOrderAllThunk =
    createAsyncThunk('funding/getHistoryOpenOrderAll', async (data: ReqLimitPage) => {
        const res = await getHistoryOpenOrderAll(data)
        return res
    })

export const getHistoryOpenOrderThunk =
    createAsyncThunk('funding/getHistoryOpenOrder', async (data: IReqHistoryOpenOrder) => {
        const res = await getHistoryOpenOrder(data)
        return res
    })

export const getHistoryOrderThunk =
    createAsyncThunk('funding/getHistoryOrder', async (data: any) => {
        const res = await getHistoryOrder(data)
        return res
    })

export const getListPositionCloseThunk =
    createAsyncThunk('funding/getListPositionClose', async () => {
        const res = await getListPositionClose()
        return res
    })

export const getHistoryChangeBalanceThunk =
    createAsyncThunk('funding/getHistoryChangeBalance', async (data: any) => {
        const res = await getHistoryChangeBalance(data)
        return res
    })

export const getChartStatisticsUserThunk =
    createAsyncThunk('funding/getChartStatisticsUser', async (data: any) => {
        const res = await getChartStatisticsUser(data)
        return { ...res, day: data.day }
    })

export const getHistoryDepositThunk =
    createAsyncThunk('funding/getHistoryDeposit', async (data: any) => {
        const res = await getHistoryDeposit(data)
        return res
    })