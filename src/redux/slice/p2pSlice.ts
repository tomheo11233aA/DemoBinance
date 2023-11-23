import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IP2pSlice {
    topTab: string;
    bottomTab: string;
    tabBuySell: 'buy' | 'sell';
}

const initialState: IP2pSlice = {
    topTab: 'p2p',
    bottomTab: 'p2p',
    tabBuySell: 'buy',
}

const p2pSlice = createSlice({
    name: 'p2p',
    initialState,
    reducers: {
        setBottomTab: (state, action: PayloadAction<string>) => {
            state.bottomTab = action.payload
        },
        setTopTab: (state, action: PayloadAction<string>) => {
            state.topTab = action.payload
        },
        setTabBuySell: (state, action: PayloadAction<'buy' | 'sell'>) => {
            state.tabBuySell = action.payload
        }
    }
})

export const { 
    setTopTab,
    setBottomTab,
    setTabBuySell,
} = p2pSlice.actions

export default p2pSlice