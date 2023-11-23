import { checkTransactionDepositVndThunk, getBankingThunk, getChartStatisticsUserThunk, getHistoryChangeBalanceThunk, getHistoryDepositThunk, getHistoryOpenOrderAllThunk, getHistoryOpenOrderThunk, getHistoryOrderThunk, getListPositionCloseThunk } from "@asyncThunk/fundingAsyncThunk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { depositStep } from "@util/contants";
import { IBank, IChartStatisticsUser, IHistoryChangeBalance, IOpenOrder, IOrderHistory } from "src/model/fundingModel";
import { IDepositInfo, historyDeposit } from "src/model/walletModel";

interface IFundingSlice {
    banks: IBank[],
    loading: boolean,
    openOrders: {
        data: IOpenOrder[];
    },
    orderHistorys: {
        data: IOrderHistory[],
    },
    positionsHistory: {
        data: [],
    },
    historyChangeBalance: {
        data: IHistoryChangeBalance[],
        page: number,
    },
    historyDeposits: {
        data: historyDeposit[]
    },
    chartStatisticsUser: {
        day: string,
        data: IChartStatisticsUser[],
    },
    deposit: {
        step: string;
        bankChoosed: IBank | null;
        transferInfo: IDepositInfo | null;
    },
}

const initialState: IFundingSlice = {
    banks: [],
    loading: false,
    openOrders: {
        data: [],
    },
    orderHistorys: {
        data: [],
    },
    historyChangeBalance: {
        data: [],
        page: 1,
    },
    positionsHistory: {
        data: [],
    },
    chartStatisticsUser: {
        day: '7day',
        data: [],
    },
    deposit: {
        step: depositStep.PAYMENT,
        bankChoosed: null,
        transferInfo: null,
    },
    historyDeposits: {
        data: []
    },
}

const fundingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBankChoosed: (state, action: PayloadAction<IBank>) => {
            state.deposit.bankChoosed = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getBankingThunk.fulfilled, (state, { payload }) => {
                // state.loading = false
                if (payload.status) {
                    state.banks = payload.data
                    state.deposit.bankChoosed = payload.data[0]
                }
            })
            .addCase(checkTransactionDepositVndThunk.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(checkTransactionDepositVndThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                if (!payload.error) {
                    if (payload.status) {
                        if (payload.data.type_admin === 0 && payload.data.type_user === 0) {
                            state.deposit.step = depositStep.CONFIRM_PAYMENT
                            state.deposit.transferInfo = payload.data
                        } else if (payload.data.type_admin === 2 && payload.data.type_user === 0) {
                            if (payload.data.images) {
                                state.deposit.step = depositStep.DONE
                                state.deposit.transferInfo = payload.data
                            } else {
                                state.deposit.step = depositStep.SUBMIT_IMG
                                state.deposit.transferInfo = payload.data
                            }
                        }
                    } else {
                        state.deposit.step = depositStep.TRANSFER
                        state.deposit.transferInfo = null
                    }
                } else {
                    state.loading = true
                }
            })
            .addCase(getHistoryOpenOrderAllThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.openOrders.data = payload.data.array
                }
            })
            .addCase(getHistoryOpenOrderThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.openOrders.data = payload.data.array
                }
            })
            .addCase(getHistoryOrderThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.orderHistorys.data = payload.data.array
                }
            })
            .addCase(getListPositionCloseThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.positionsHistory.data = payload.data.array
                }
            })
            .addCase(getHistoryChangeBalanceThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.historyChangeBalance.data = payload.data.array
                }
            })
            .addCase(getChartStatisticsUserThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.chartStatisticsUser.data = payload.data
                    state.chartStatisticsUser.day = payload.day
                }
            })
            .addCase(getHistoryDepositThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.historyDeposits.data = payload.data.array
                }
            })
    }
})

export const {
    setBankChoosed,
} = fundingSlice.actions

export default fundingSlice