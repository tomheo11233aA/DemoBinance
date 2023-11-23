import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { ReqLimitPage } from "src/model/commomModel"

export const getHistoryOpenOrder = async (data: ReqLimitPage) => {
    try {
        const res = await axiosInstance.post('/api/binance/getHistoryOpenOrder', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const getPosition = async (symbol: string) => {
    try {
        const res = await axiosInstance.post('/api/binance/getPosition', { symbol })
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const closeMarketFuture = async (idFuture: number) => {
    try {
        const res = await axiosInstance.post('/api/binance/closeMarketFuture', { idFuture })
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const funding = async () => {
    try {
        const res = await axiosInstance.get('/api/binance/funding')
        // const res = {
        //     message: "funding success",
        //     "status": true,
        //     "error": false,
        //     data: [
        //         {
        //             "symbol": "BTC",
        //             "symbolLogo": "https://cdn.coinglasscdn.com/static/img/coins/bitcoin-BTC.png",
        //             "status": 0,
        //             "uMarginList": [
        //                 {
        //                     "rate": 0.01,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/270.png",
        //                     "exchangeName": "Binance",
        //                     "status": 1,
        //                     "nextFundingTime": 1687418460000
        //                 },
        //                 {
        //                     "rate": 0.03011904160944,
        //                     "predictedRate": 0.00417966735793,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/okx2.png",
        //                     "exchangeName": "OKX",
        //                     "status": 2,
        //                     "nextFundingTime": 1687420800000
        //                 },
        //                 {
        //                     "rate": 0.01580808,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/coins/DYDX.png",
        //                     "exchangeName": "dYdX",
        //                     "status": 1,
        //                     "nextFundingTime": 1687420800000
        //                 },
        //                 {
        //                     "rate": 0.01,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/bybit2.png",
        //                     "exchangeName": "Bybit",
        //                     "status": 1
        //                 },
        //                 {
        //                     "rate": 0.0024,
        //                     "predictedRate": 0.0024,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/gate.png",
        //                     "exchangeName": "Gate",
        //                     "status": 2
        //                 },
        //                 {
        //                     "rate": 0.0101,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/bitget3.png",
        //                     "exchangeName": "Bitget",
        //                     "status": 1,
        //                     "nextFundingTime": 1687420800000
        //                 },
        //                 {
        //                     "rate": 0.007478,
        //                     "predictedRate": -0.020143,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/CoinEx.png",
        //                     "exchangeName": "CoinEx",
        //                     "status": 2,
        //                     "nextFundingTime": 1687420791096
        //                 },
        //                 {
        //                     "rate": 0.0405,
        //                     "predictedRate": 0.064678,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/bitfinex.jpg",
        //                     "exchangeName": "Bitfinex",
        //                     "status": 2,
        //                     "nextFundingTime": 1687420800000
        //                 },
        //                 {
        //                     "rate": 0.00161018875,
        //                     "predictedRate": 0.003035125,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/k.jpg",
        //                     "exchangeName": "Kraken",
        //                     "status": 2,
        //                     "nextFundingTime": 1687420800000
        //                 },
        //                 {
        //                     "rate": 0.01,
        //                     "predictedRate": 0.01,
        //                     "exchangeLogo": "https://cdn.coinglasscdn.com/static/exchanges/2502.png",
        //                     "exchangeName": "Huobi",
        //                     "status": 2,
        //                     "nextFundingTime": 1687420800000
        //                 }
        //             ],
        //         },
        //     ]
        // }
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const leverAdjustmentAPI = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/leverAdjustment', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const setTPSLPosition = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/setTPSLPosition', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const setCancelTPPosition = async (idPosition: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/setCancelTPPosition', { idPosition })
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}

export const setCancelSLPosition = async (idPosition: any) => {
    try {
        const res = await axiosInstance.post('/api/binance/setCancelSLPosition', { idPosition })
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}