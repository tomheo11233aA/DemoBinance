import { checKYCUserThunk, getProfileThunk, getProfileThunkUserID, loginThunk } from "@asyncThunk/userAsyncThunk";
import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import contants from "@util/contants";
import { IPayloadUser, Profile } from "src/model/userModel";

interface IUserSlice {
    isLogin: boolean,
    profile: Profile | {},
    userID: number | undefined,
    loading: boolean,
    kyc: string,
    type: string,
    showBalance: boolean,
    logOut: boolean,
    theme: 'dark' | 'light',
}

const initialState: IUserSlice = {
    isLogin: false,
    profile: {},
    userID: undefined,
    loading: false,
    kyc: '',
    type: 'live',
    showBalance: true,
    logOut: false,
    theme: 'light',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowBalance: (state, action: PayloadAction<boolean>) => {
            state.showBalance = action.payload
        },
        signOut: (state) => {
            state.profile = {}
            state.isLogin = false
            state.logOut = true
        },
        setTheme: (state, { payload }) => {
            state.theme = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, (state, { payload }: IPayloadUser<Profile>) => {
                state.loading = false
                if (payload.status) {
                    state.isLogin = true
                    state.profile = payload.data
                    state.userID = Number(payload.data.id)
                }
            })
            .addCase(checKYCUserThunk.fulfilled, (state, { payload }: IPayloadUser<string>) => {
                if (!payload.error) {
                    if (payload.status) {
                        state.kyc = payload.data
                    } else {
                        state.kyc = contants.NOT_KYC
                    }
                }
            })
            .addCase(getProfileThunk.fulfilled, (state, { payload }: IPayloadUser<Profile>) => {
                if (payload.status) {
                    state.isLogin = true
                    state.profile = payload.data
                }
            })
            .addCase(getProfileThunkUserID.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.isLogin = true
                    state.profile = payload.data
                    state.userID = payload.data.id
                }
            })
            .addMatcher(isAnyOf(loginThunk.pending), (state) => {
                state.loading = true
            })
    }
})

export default userSlice