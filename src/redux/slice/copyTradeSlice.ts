import { getHistoryOrderCopyThunk, getHistoryTradeToTraderThunk, getListCancelCopyTraderThunk, getListCopiersThunk, getListCopyingTraderThunk, getListPositionCloseCopyThunk, getListUserTraderThunk, getPositionToTraderThunk } from "@asyncThunk/copyTradeAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

interface ICopyTradeSlice {
    listUserTrader: {
        loading: boolean;
        data: any[];
        total: number;
    },
    positionToTrader: {
        loading: boolean;
        data: any[];
    };
    hotTrader: any;
    showModalListDay: boolean;
    dayChoosed: number;
    listCopiers: {
        loading: boolean;
        data: [];
        total: number;
    },
    futureTrader: {
        total: number;
        data: any;
    },
    listPositionCloseCopy: {
        loading: boolean;
        data: any;
        total: number;
    },
    historyOrderCopy: {
        loading: boolean;
        data: any;
        total: number;
    },
    copyingTrader: {
        loading: boolean;
        data: any;
        total: number;
    },
    listCancelCopyTrader: {
        loading: boolean;
        data: any;
        total: number;
    }
}

const initialState: ICopyTradeSlice = {
    listUserTrader: {
        loading: false,
        data: [],
        total: 0,
    },
    positionToTrader: {
        loading: false,
        data: [],
    },
    hotTrader: {},
    showModalListDay: false,
    dayChoosed: 7,
    listCopiers: {
        loading: false,
        data: [],
        total: 0,
    },
    futureTrader: {
        total: 0,
        data: [],
    },
    listPositionCloseCopy: {
        loading: false,
        data: [],
        total: 0
    },
    historyOrderCopy: {
        loading: false,
        data: [],
        total: 0,
    },
    copyingTrader: {
        loading: false,
        data: [],
        total: 0,
    },
    listCancelCopyTrader: {
        loading: false,
        data: [],
        total: 0,
    },
}

const copyTradeSlice = createSlice({
    name: 'copyTrade',
    initialState,
    reducers: {
        setHotTrader: (state, { payload }) => {
            state.hotTrader = payload
        },
        setDayChoosed: (state, { payload }) => {
            state.dayChoosed = payload
            state.showModalListDay = false
        },
        setShowModalListDay: (state, { payload }) => {
            state.showModalListDay = payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getListUserTraderThunk.pending, (state) => {
                state.listUserTrader.loading = true
            })
            .addCase(getListUserTraderThunk.fulfilled, (state, { payload }) => {
                state.listUserTrader.loading = false
                if (payload.status) {
                    state.listUserTrader.data = payload.data.array
                    state.listUserTrader.total = payload.data.total
                }
            })
            .addCase(getPositionToTraderThunk.pending, (state) => {
                state.positionToTrader.loading = true
            })
            .addCase(getPositionToTraderThunk.fulfilled, (state, { payload }) => {
                state.positionToTrader.loading = false
                if (payload.status) {
                    state.positionToTrader.data = payload.data
                } else {
                    state.positionToTrader.data = []
                }
            })
            .addCase(getListCopiersThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.listCopiers.data = payload.data.array
                    state.listCopiers.total = payload.data.total
                } else {
                    state.listCopiers.data = []
                    state.listCopiers.total = 0
                }
            })
            .addCase(getHistoryTradeToTraderThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.futureTrader.data = payload.data.array
                    state.futureTrader.total = payload.data.total
                }
            })
            .addCase(getListPositionCloseCopyThunk.pending, (state,) => {
                state.listPositionCloseCopy.loading = true
            })
            .addCase(getListPositionCloseCopyThunk.fulfilled, (state, { payload }) => {
                state.listPositionCloseCopy.loading = false
                if (payload.status) {
                    state.listPositionCloseCopy.data = payload.data.array
                    state.listPositionCloseCopy.total = payload.data.total
                }
            })
            .addCase(getHistoryOrderCopyThunk.pending, (state) => {
                state.historyOrderCopy.loading = true
            })
            .addCase(getHistoryOrderCopyThunk.fulfilled, (state, { payload }) => {
                state.historyOrderCopy.loading = false
                if (payload.status) {
                    state.historyOrderCopy.data = payload.data.array
                    state.historyOrderCopy.total = payload.data.total
                }
            })
            .addCase(getListCopyingTraderThunk.pending, (state) => {
                state.copyingTrader.loading = true
            })
            .addCase(getListCopyingTraderThunk.fulfilled, (state, { payload }) => {
                state.copyingTrader.loading = false
                if (payload.status) {
                    state.copyingTrader.data = payload.data.array
                    state.copyingTrader.total = payload.data.total
                }
            })
            .addCase(getListCancelCopyTraderThunk.pending, (state) => {
                state.listCancelCopyTrader.loading = true
            })
            .addCase(getListCancelCopyTraderThunk.fulfilled, (state, { payload }) => {
                state.listCancelCopyTrader.loading = false
                if (payload.status) {
                    state.listCancelCopyTrader.data = payload.data.array
                    state.listCancelCopyTrader.total = payload.data.total
                }
            })
    }
})

export const {
    setHotTrader,
    setDayChoosed,
    setShowModalListDay,
} = copyTradeSlice.actions

export default copyTradeSlice