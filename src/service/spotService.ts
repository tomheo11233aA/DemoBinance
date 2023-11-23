import { callFailed, callSuccess } from "@method/requestResult"
import { ReqOrderSpot } from "src/model/spotModel"
import axiosInstance from "./axios"

export const orderSpot = async (data: ReqOrderSpot) => {
    try {
        const res = await axiosInstance.post('/api/binance/orderSpot', data)
        return callSuccess(res)
    } catch (error) {
        callFailed()
    }
}