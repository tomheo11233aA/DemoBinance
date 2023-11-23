import { createAsyncThunk } from "@reduxjs/toolkit"
import { getWallet } from "@service/fundingService"

export const getWalletThunk = createAsyncThunk('spot/getWallet', async () => {
    const res = await getWallet()
    return res
})
