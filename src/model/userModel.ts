export interface Login {
    email: string,
    password: string,
    otp?: string,
}

export interface Profile {
    active: number,
    admin: number,
    avatar: string,
    balance: number,
    beforeCommission: number,
    beforeTotalOrder: number,
    block: number,
    blockLevel: number,
    commissionBalance: number,
    commissionMemberVip: number,
    created_at: string,
    demoBalance: number,
    deposit: number,
    double10: number,
    email: string,
    id: number | string,
    level: number,
    marketing: number,
    parentId: number,
    referral: string,
    totalCommission: number,
    totalMember: number,
    totalMemberVip: number,
    totalMemberVipF1: number,
    totalOrder: number,
    totalOrderF1: number,
    trade: number,
    twofa: number,
    type: number,
    updateLevel_at: string,
    userName: string,
    userNameParent: string,
    tokenBalance: number,
}

export interface ChangePassword {
    password: string,
    newPassword: string,
}

export interface IPayloadUser<data> {
    payload: {
        status?: boolean,
        data: data,
        error: boolean,
    }
}