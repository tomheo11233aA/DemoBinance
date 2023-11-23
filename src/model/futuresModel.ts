import { IOpenOrder } from "./fundingModel";

export interface IPositions extends IOpenOrder {
    id: number;
    ROE: number;
    PNL: number;
    RISK: number;
    SIZE: number;
    core: number;
    ROUND: number;
    email: string;
    margin: number;
    symbol: string;
    userid: number;
    LIQ_PRICE: number;
    MARK_PRICE: number;
    amountCoin: number;
    entryPrice: number;
    side: 'buy' | 'sell';
    liquidationPrice: number;
    regime: 'cross' | 'isolated';
}

export interface IFunding {
    symbol: string;
    status: number;
    uPrice: number;
    cPrice: number;
    symbolLogo: string;
    uIndexPrice: number;
    cIndexPrice: number;
    uMarginList: IMarginList[];
    cMarginList: IMarginList[];
}

export interface IMarginList {
    rate: number,
    exchangeLogo: string,
    exchangeName: string,
    status: number,
    nextFundingTime: number,
}

export interface ICoins {
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
}

export interface ISellBuy {
    amount: number;
    created_at: string;
    id: number;
    price: number;
    symbol: string;
    totalUsdt: number;
    percent: number;
}

export interface ITriggerTPSL {
    showOption: boolean;
    value: 'Mark' | 'Last';
    tpsl: '' | 'TPSL' | 'RO';
}

export interface ITpslPosition {
    showModal: boolean;
    position: IPositions | null;
}

export interface IFeeOrderFuture {
    id: number,
    name: string
    value: number,
    data: null,
}