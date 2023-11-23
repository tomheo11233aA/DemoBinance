import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import contants from "@util/contants";
import { IcountryImage, countryImage } from "@util/countryImage";

interface IkycSlice {
    step: string,
    country: IcountryImage,
    frontCard: {
        name: string,
        path: string,
    },
    backCard: {
        name: string,
        path: string,
    },
    selfiePhoto: {
        name: string,
        path: string,
    },
}

const initialState: IkycSlice = {
    step: contants.DOCUMENT_VERIFICATION,
    country: countryImage[248],
    frontCard: {
        name: '',
        path: '',
    },
    backCard: {
        name: '',
        path: '',
    },
    selfiePhoto: {
        name: '',
        path: '',
    },
}

const kycSlice = createSlice({
    name: 'kyc',
    initialState,
    reducers: {
        setCountry: (state, action: PayloadAction<IcountryImage>) => {
            state.country = action.payload
        },
        setStep: (state, action: PayloadAction<string>) => {
            state.step = action.payload
        },
        setFrontCard: (state, action: PayloadAction<string>) => {
            state.frontCard.path = action.payload
            state.step = contants.BACK_ID_CARD
        },
        setBackCard: (state, action: PayloadAction<string>) => {
            state.backCard.path = action.payload
            state.step = contants.FORM_KYC
        },
        setSelfiePhoto: (state, action: PayloadAction<string>) => {
            state.selfiePhoto.path = action.payload
            state.step = contants.FORM_KYC
        },
    },
})

export const {
    setStep,
    setCountry,
    setBackCard,
    setFrontCard,
    setSelfiePhoto,
} = kycSlice.actions

export default kycSlice