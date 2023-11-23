import { IPositions } from "./futuresModel";

export interface ReqGetTotalBuy {
    limit: number;
    page: number;
    symbol: string;
}

export interface ReqOrderFuture {
    side: string;
    regime: string;
    symbol: string;
    typeTrade: string;
    core: string | number;
    amount: string | number;
    priceLimit?: string | number;
    TP: string | number | undefined;
    SL: string | number | undefined;
    triggerTP: 'Mark' | 'Last' | undefined;
    triggerSL: 'Mark' | 'Last' | undefined;
}

export interface ReqLimitPage {
    limit: number,
    page: number,
}

export type RootStackParamList = {
    Home: undefined;
    Futures: {
        position: IPositions
    };
};