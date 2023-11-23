export interface historyWithdraw {
    id: number;
    userid: string;
    symbol: string;
    amount: number;
    status: number;
    toAddress: string;
    hash: any;
    created_at: string;
    feeWidthdraw: number;
    balanceWidthdraw: number;
    network: string;
    userName: string;
}

export interface historyDeposit {
    id: number;
    amount: number;
    created_at: string;
    userid: number;
}

export interface reqWithdraw {
    symbol: string;
    amount: string;
    network: string;
    toAddress: string;
}

export interface IDepositInfo {
    id: number;
    bank_name: string;
    amount: number;
    created_at: string;
    note: null | string;
    type_admin: number;
    type_user: number;
    percent: number;
    id_banking_admin: number;
    userid: number;
    images: null | string;
    code_unique: string;
    name_banking_admin: string;
    number_banking_admin: string | number;
    owner_banking_admin: string;
}