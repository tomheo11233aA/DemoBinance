import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { IReqCreateDepositVND, IReqHistoryOpenOrder } from "src/model/fundingModel"
import axiosUpload from "./axiosUpload"
import { ReqLimitPage } from "src/model/commomModel"

export const getHistoryDeposit = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryDeposit', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getValueConfig = async (name: string) => {
    try {
        const res = await axiosInstance.post('/api/user/getValueConfig', { name })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryWidthdraw = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryWidthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const withDraw = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/widthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const transfer = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/transfer', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryTransfer = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryTransfer', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const createWallet = async (symbol: string) => {
    try {
        const res = await axiosInstance.post('/api/user/createWallet', { symbol })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getWallet = async () => {
    try {
        const res = await axiosInstance.post('/api/user/getWallet', {})
        // return callSuccess({
        //     "data": {
        //         "btc_balance": 10,
        //         "eth_balance": 5,
        //         "ltc_balance": 0,
        //         "usdt.bep20_balance": 0,
        //         "usdt_balance": 101,
        //     },
        //     "message": "Successfully retrieved wallet information!",
        //     "status": true,
        // })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getBanking = async () => {
    try {
        const res = await axiosInstance.post('/api/depositVND/getBanking', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const cancelTransactionDepositVnd = async (idTransaction: string | number) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/cancelTransactionDepositVnd', { idTransaction })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const createDepositVND = async (data: IReqCreateDepositVND) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/createDepositVND', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const verifyTransactionDepositVnd = async (idTransaction: string | number) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/verifyTransactionDepositVnd', { idTransaction })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const uploadImageDeposiVND = async (formData: FormData) => {
    try {
        const res = await axiosUpload.post('/api/depositVND/uploadImageDeposiVND', formData)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryOpenOrderAll = async (data: ReqLimitPage) => {
    try {
        const res = await axiosInstance.post('/api/binance/getHistoryOpenOrderAll', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryOpenOrder = async (data: IReqHistoryOpenOrder) => {
    try {
        const res = await axiosInstance.post('/api/binance/getHistoryOpenOrder', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryOrder = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/getHistoryOrder', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const cancelOpenOrder = async (id: number) => {
    try {
        const res = await axiosInstance.post('/api/binance/cancelOpenOrder', { id })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getListPositionClose = async () => {
    try {
        const res = await axiosInstance.post('/api/binance/getListPositionClose', {
            limit: 1000,
            page: 1,
        })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getWalletToSymbol = async (data: { symbol: string }) => {
    try {
        const res = await axiosInstance.post('/api/binance/getWalletToSymbol', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}
