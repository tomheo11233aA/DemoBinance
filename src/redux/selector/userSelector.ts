import { RootState } from "../store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin

export const loadingUserSelector = (state: RootState) => state.user.loading

export const kycUserSelector = (state: RootState) => state.user.kyc 

export const profileUserSelector = (state: RootState) => state.user.profile

export const typeUserSelector = (state: RootState) => state.user.type

export const showBalanceSelector = (state: RootState) => state.user.showBalance 

export const themeUserSelector = (state: RootState) => state.user.theme

export const userIDSelector = (state: RootState) => state.user.userID