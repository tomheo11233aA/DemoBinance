import { configureStore } from "@reduxjs/toolkit";
import copyTradeSlice from "@slice/copyTradeSlice";
import fundingSlice from "@slice/fundingSlice";
import futuresSlice from "@slice/futuresSlice";
import kycSlice from "@slice/kycSlice";
import p2pSlice from "@slice/p2pSlice";
import piSlice from "@slice/piSlice";
import spotSlice from "@slice/spotSlice";
import tradeSlice from "@slice/tradeSlice";
import userSlice from "@slice/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        trade: tradeSlice.reducer,
        futures: futuresSlice.reducer,
        spot: spotSlice.reducer,
        p2p: p2pSlice.reducer,
        kyc: kycSlice.reducer,
        funding: fundingSlice.reducer,
        copyTrade: copyTradeSlice.reducer,
        pi: piSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store