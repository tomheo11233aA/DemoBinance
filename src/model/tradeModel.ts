export interface Trade {
    buy: number;
    buyer: number;
    close: number;
    closeBuy: number;
    closeCandlestick: number;
    closeSell: number;
    closeTimestamp: number;
    high: number;
    id: number;
    idChart: number;
    low: number;
    open: number;
    volume: number;
    order: number;
    orderAuto: number;
    orderBuy: number;
    orderSell: number;
    sell: number;
    seller: number;
    symbol: string;
    time: number;
    timestamp: number;
}

export interface Coin {
    bestAsk: number;
    close: number;
    closeCandlestick: number;
    currency: string;
    high: number;
    id: number;
    image: string;
    low: number;
    open: number;
    pair: string;
    percentChange: number;
    symbol: string;
    volume: number;
    content: string;
    balance: number;
    exchangeRate: number
}

export interface BuySell {
    id: number;
    amount: number;
    totalUsdt: number;
    totalUSDT: number;
    price: number;
    created_at: string;
    symbol: string;
    percent: string;
}

export interface IChart {
    close: string;
    closeTime: number;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    takerBuyBaseVolume: string;
    takerBuyQuoteVolume: string;
    time: number;
    trades: number;
    volume: string;
}

export interface ITimeLimit {
    buy?: number;
    buyer?: number;
    close?: number;
    closeBuy?: number;
    closeCandlestick?: number;
    closeSell?: number;
    closeTimestamp?: string;
    high?: number;
    id?: number;
    idChart?: number;
    low?: number;
    open?: number;
    order?: number;
    orderAuto?: number;
    orderBuy?: number;
    orderSell?: number;
    sell?: number;
    seller?: number;
    symbol?: string;
    time?: number;
    timeString?: string;
    timestamp?: number;
    volume?: number;
}