export interface ReqOrderSpot {
    side: string;
    symbol: string;
    typeTrade: string;
    amount: string | number;
    priceLimit?: string | number;
}

export interface ICoinChoosed {
    symbol: string;
    currency: string;
    bestAsk?: number;
    close?: number;
    closeCandlestick?: number;
    high?: number;
    id?: number;
    image?: string;
    low?: number;
    open?: number;
    pair?: string;
    percentChange?: number;
    volume?: number;
}