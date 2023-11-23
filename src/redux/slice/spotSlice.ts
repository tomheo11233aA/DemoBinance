import { getWalletThunk } from "@asyncThunk/spotAsyncThunk";
import { findFieldValueWalletByCurrency } from "@method/format";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { colors } from "@theme/colors";
import { ICoins, ISellBuy } from "src/model/futuresModel";
import { ICoinChoosed } from "src/model/spotModel";

interface ISpotSlice {
    wallet: any;
    coins: ICoins[];
    percent: number;
    iceberg: boolean;
    loading: boolean;
    side: 'buy' | 'sell';
    price: number | string;
    total: number | string;
    amount: number | string;
    coinChoosed: ICoinChoosed;
    typeTrade: 'Limit' | 'Market';
    icebergAmount: number | string;
    totalAmount: 'Amount' | 'Total';
    buys: {
        color: string;
        data: ISellBuy[];
        price: number | string;
    };
    sells: {
        color: string
        data: ISellBuy[];
        price: number | string;
    };
}

const initialState: ISpotSlice = {
    price: '',
    total: '',
    coins: [],
    amount: '',
    percent: 0,
    side: 'buy',
    wallet: null,
    loading: true,
    iceberg: false,
    icebergAmount: '',
    typeTrade: 'Market',
    totalAmount: 'Amount',
    buys: {
        data: [],
        price: 0,
        color: colors.red3,
    },
    sells: {
        data: [],
        price: 0,
        color: colors.red3,
    },
    coinChoosed: {
        currency: 'BTC',
        symbol: 'BTCUSDT',
    },
}

const spotSlice = createSlice({
    name: 'spot',
    initialState,
    reducers: {
        setPercent: (
            state,
            action: PayloadAction<number>
        ) => {
            state.percent = action.payload
            if (state.side === 'buy') {
                const avbl = findFieldValueWalletByCurrency(state.wallet, 'usdt')
                state.amount =  state.percent / 100 * avbl
            } else {
                const avbl = findFieldValueWalletByCurrency(state.wallet, state.coinChoosed.currency)
                state.amount =  state.percent / 100 * avbl
            }
        },
        setBuys: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'buy')
        },
        cathEventWhemChangeCurreny: (state) => {
            state.amount = ''
            state.percent = 0
        },
        setCoins: (state, action: PayloadAction<ICoins[]>) => {
            state.coins = action.payload
        },
        setIceberg: (state, action: PayloadAction<boolean>) => {
            state.iceberg = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setSide: (state, action: PayloadAction<'buy' | 'sell'>) => {
            state.side = action.payload
            state.percent = 0
            state.amount = ''
        },
        setSells: (state, { payload }) => {
            setSellOrBuy(state, payload.array, 'sell')
        },
        setPrice: (state, action: PayloadAction<number | string>) => {
            state.price = action.payload
        },
        setTotal: (state, action: PayloadAction<number | string>) => {
            state.total = action.payload
        },
        setAmount: (state, action: PayloadAction<number | string>) => {
            state.amount = action.payload
            if (state.percent !== 0) state.percent = 0
        },
        setCoinChoosed: (state, action: PayloadAction<ICoinChoosed>) => {
            state.coinChoosed = action.payload
            state.loading = true
        },
        setTypeTrade: (state, action: PayloadAction<'Limit' | 'Market'>) => {
            state.typeTrade = action.payload
        },
        setIcebergAmount: (state, action: PayloadAction<number | string>) => {
            state.icebergAmount = action.payload
        },
        setTotalAmount: (state, action: PayloadAction<'Amount' | 'Total'>) => {
            state.totalAmount = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getWalletThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.wallet = payload.data
                }
            })
    }
})

const setSellOrBuy = async (state: ISpotSlice, array: any, type: 'sell' | 'buy') => {
    if (array.length > 0) {
        let price = 0
        if (state.coins.length > 0) {
            price = state.coins.filter(coin => coin.symbol === state.coinChoosed.symbol)[0].close
        }
        const max_amount = Math.max.apply(Math, array.map((item: any) => item.amount))
        const min_amount = Math.min.apply(Math, array.map((item: any) => item.amount))
        const tb_amount = max_amount - min_amount

        if (type === 'sell') {
            state.sells.color = array[0].price >= state.sells.price ? colors.greenCan : colors.red3

            state.sells.price = price < 10 ? price.toFixed(4) :
                (price > 9 && price < 51) ? price.toFixed(3) : price.toFixed(1)
        }
        state.buys.price = state.sells.price

        array = array.sort((p1: any, p2: any) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0)
        array = array.map((item: any) => {
            return (
                {
                    ...item,
                    amount: item.amount * price,
                    price: price < 10 ? item.price.toFixed(4) :
                        (price > 9 && price < 51) ? item.price.toFixed(3) : item.price.toFixed(1),
                    percent: (item.amount - min_amount) * 100 / tb_amount
                }
            )
        })
        if (type === 'sell') {
            state.sells.data = array.slice(0, 7)
        } else {
            state.buys.data = array.slice(0, 7)
        }
    }
}

export const {
    setSide,
    setBuys,
    setSells,
    setPrice,
    setTotal,
    setCoins,
    setAmount,
    setIceberg,
    setPercent,
    setLoading,
    setTypeTrade,
    setTotalAmount,
    setCoinChoosed,
    setIcebergAmount,
    cathEventWhemChangeCurreny,
} = spotSlice.actions

export default spotSlice