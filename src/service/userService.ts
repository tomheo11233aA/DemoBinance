import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { ChangePassword, Login } from "src/model/userModel"
import axiosUpload from "./axiosUpload"
import contants from "@util/contants"

export const login = async (data: Login) => {
    try {
        const res = await axiosInstance.post('/api/user/login', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getProfile = async () => {
    try {
        const res = await axiosInstance.post('/api/user/getProfile')
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checKYCUser = async () => {
    try {
        const res = await axiosInstance.post('/api/user/checkKycUser', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const uploadAvatar = async (fromData: FormData) => {
    try {
        const res = await axiosUpload.post('/api/user/uploadAvatar', fromData)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}
export const kycUser = async (formData: FormData) => {
    const res = await fetch(contants.HOSTING + '/api/user/kycUser', {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    return res.json()
}

export const generateOTPToken = async () => {
    try {
        const res = await axiosInstance.post('/api/user/generateOTPToken', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const changePassword = async (data: ChangePassword) => {
    try {
        const res = await axiosInstance.post('/api/user/changePassword', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const turn2FA = async (otp: any) => {
    try {
        const res = await axiosInstance.post('/api/user/turn2FA', { otp })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checkUser2fa = async (email: string) => {
    try {
        const res = await axiosInstance.post('/api/user/checkuser2fa', { email })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const createWallet = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/user/createWallet', { symbol: data.symbol })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const signUp = async (data: any) => {
    try {
        const res = await axiosInstance.post('/api/user/signup', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getValueConfig = async (name: string) => {
    try {
        const res = await axiosInstance.post('/api/user/getValueConfig', { name })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}


