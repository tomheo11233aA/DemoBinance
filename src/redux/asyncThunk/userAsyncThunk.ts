import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { checKYCUser, getProfile, login } from "@service/userService"
import contants from "@util/contants"
import { Login } from "src/model/userModel"

export const loginThunk = createAsyncThunk('user/login', async (data: Login) => {
    const res = await login(data)
    if (!res.error && res.status) {
        console.log(res.data.token)
        await AsyncStorage.setItem(contants.TOKEN, res.data.token)
        const response = await getProfile()
        return response
    }
    return res
})

export const checKYCUserThunk = createAsyncThunk('user/checKYCUser', async () => {
    const res = await checKYCUser()
    return res
})

export const getProfileThunk = createAsyncThunk('user/getProfile', async () => {
    const res = await getProfile()
    return res
})

export const getProfileThunkUserID = createAsyncThunk('user/getProfileUserID', async () => {
    const res = await getProfile()
    return res
})
