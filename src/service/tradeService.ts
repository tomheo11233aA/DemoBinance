import { callFailed, callSuccess } from "@method/requestResult"
import { ReqGetTotalBuy, ReqOrderFuture } from "src/model/commomModel"
import axiosInstance from "./axios"
import contants from "@util/contants"
import axiosDomain2 from "./axiosDomain2"

export const getListCoin = async () => {
    try {
        const res = await axiosInstance.post('/api/binance/getListCoin')
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getChart = async (data: any) => {
    try {
        // const res = await axiosInstance.post('/api/binaryOption/getChart', data)
        const res = await axiosDomain2.post('/api/binaryOption/getChart', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getTotalBuy = async (data: ReqGetTotalBuy) => {
    try {
        const res = await axiosInstance.post('/api/binance/getTotalBuy', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const getTotalSell = async (data: ReqGetTotalBuy) => {
    try {
        const res = await axiosInstance.post('/api/binance/getTotalSell', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const orderFuture = async (data: ReqOrderFuture) => {
    try {
        const res = await axiosInstance.post('/api/binance/orderFuture', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const closeMarketFutureAll = async () => {
    try {
        const res = await axiosInstance.post('/api/binance/closeMarketFutureAll', {})
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}
