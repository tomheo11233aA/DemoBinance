import { RootState } from "../store";

export const countryKYCSelector = (state: RootState) => state.kyc.country

export const stepKYCSelector = (state: RootState) => state.kyc.step 

export const KYCSelector = (state: RootState) => state.kyc