import { IOpenOrder, IOpenOrderConver, IPositionHistory } from "src/model/fundingModel";
import { ICoins, IPositions } from "src/model/futuresModel";
import { Profile } from "src/model/userModel";

export const numberWithCommas = (x: number): string => {
    const number = x?.toFixed(0)
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const converNetwork = (str: any) => {
    if (str) {
        const dotIndex = str.indexOf('.')
        return str.slice(dotIndex + 1, str.length)
    }
}

export const kFormatter = (num: any) => {
    'worklet'
    return Math.abs(num) > 999 ? Math.sign(num) * Number(((Math.abs(num) / 1000).toFixed(1))) + 'k' : Math.sign(num) * Math.abs(num)
}

export const thousand = (num: any) => {
    'worklet'
    return Math.abs(num) > 999 ? Math.sign(num) * Number(((Math.abs(num) / 1000).toFixed(1))) + '' : Math.sign(num) * Math.abs(num)
}

export const numberCommasDot = (n: any) => {
    'worklet'
    var x1 = (n + "").split(".")[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!Number.isInteger(n)) {
        const x2 = (n + "").split(".")[1];
        return x1 + ',' + x2
    } else {
        return x1
    }
}

export const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const comma = (number: any) => {
    return number.replace('.', ',')
};

export const applyLetterSpacing = (string: string, count = 3) => {
    return string?.split('')?.join('\u200A'.repeat(count));
}

export const converPostirions = (position: IPositions, coins: ICoins[], balance: number) => {
    let [PNL, ROE, RISK, SIZE, MARK_PRICE, LIQ_PRICE, ROUND] = [0, 0, 0, 0, 0, 0, 1]

    if (coins.length > 0 && position) {
        let index = coins.findIndex((coin: ICoins) => coin.symbol === position.symbol)
        const close = coins[index]?.close || 0

        PNL = calcPNL(position, close)

        MARK_PRICE = close
        // ROE = PNL / position.margin * 100
        ROE = calcROE(PNL, position)
        SIZE = position.margin * position.core
        ROUND = close < 10 ? 4 : (close > 9 && close < 51) ? 3 : 1

        if (position.regime === 'isolated' && position.liquidationPrice !== 0) {
            RISK = (SIZE * close * (1 / position.core)) / position.liquidationPrice
            RISK = RISK / 1000
            if (ROE < 0) {
                RISK = RISK + ROE
            } else {
                RISK = RISK - ROE
            }
            if (RISK > 64) RISK = 64
        }

        if (position.regime === 'cross' && position.side === 'sell') {
            LIQ_PRICE = balance / (position.margin * position.core) * position.entryPrice
        } else {
            LIQ_PRICE = position.liquidationPrice
        }
    }

    return {
        ...position,
        PNL,
        ROE,
        RISK,
        SIZE,
        MARK_PRICE,
        LIQ_PRICE,
        ROUND,
    }
}

export const convertTimeGetChart = (timeString: string): number => {
    const time = Number(timeString.slice(0, timeString.length - 1))
    const unit = timeString.slice(timeString.length - 1, timeString.length)
    if (unit === 'm') {
        return time * 60
    } else if (unit === 'h') {
        return time * 3600
    } else if (unit === 'd') {
        return time * 86400
    } else if (unit === 'w') {
        return time * 604800
    } else if (unit === 'M') {
        return time * 2_592_000
    }
    return 60
}

export const convertAvblSpot = (side: 'buy' | 'sell', wallet: any, currency: string) => {
    if (side === 'buy') {
        if (wallet?.usdt_balance) return wallet.usdt_balance
    } else {
        if (wallet) {
            for (let key in wallet) {
                const keyStr = key.split('_')[0].toLocaleLowerCase()
                const currencyStr = currency.toLocaleLowerCase()
                if (keyStr == currencyStr) {
                    return wallet[key]
                }
            }
        }
    }
    return 0
}

export const findFieldValueWalletByCurrency = (wallet: any, currency: string) => {
    if (wallet) {
        for (let key in wallet) {
            const keyStr = key.split('_')[0].toLocaleLowerCase()
            const currencyStr = currency.toLocaleLowerCase()
            if (keyStr == currencyStr) {
                return wallet[key]
            }
        }
    }
    return 0
}

export interface ISpot {
    coins: any,
    balanceSpot: number,
    totalExchangeRate: number,
}

export const convertToValueSpot = (coins: ICoins[], wallet: any, profile: Profile): ISpot => {
    let data = []
    let close = 0
    let balanceSpot = 0
    let totalExchangeRate = 0
    if (coins.length > 0 && wallet) {
        data = coins
        const dataWallet = Object.entries(wallet);
        data = data.map((coin: any, index) => {
            let balance: number = 0
            let exchangeRate: number = 0
            if (index === 0) close = coin?.close
            dataWallet.map((wallet) => {
                const currencyCoin = coin.currency.toLocaleLowerCase()
                const currencyWallet = wallet[0].split('_')[0].toLocaleLowerCase()
                if (currencyCoin === currencyWallet) {
                    balance = Number(wallet[1])
                    if (coin?.close) {
                        exchangeRate = Number(coin?.close * balance)
                    }
                }
            })
            coin = { ...coin, balance, exchangeRate }
            totalExchangeRate += exchangeRate
            return coin
        })
        balanceSpot = totalExchangeRate / close
        data.push({
            currency: 'USDT',
            balance: profile.balance,
            exchangeRate: profile.balance,
            id: 18092002,
            wallet: 'USDT'
        })
    }
    return {
        balanceSpot,
        coins: data,
        totalExchangeRate,
    }
}

export interface ICalcPositions {
    pnl: number,
    margin: number,
}

export const calcPositions = (positions: IPositions[], coins: ICoins[]): ICalcPositions => {
    let [PNL, MARGIN] = [0, 0]
    if (positions.length > 0 && coins.length > 0) {
        for (let i = 0; i < positions.length; i++) {
            let index = coins.findIndex((coin: ICoins) => coin.symbol === positions[i].symbol)
            const close = coins[index]?.close || 0
            PNL += calcPNL(positions[i], close)
            if (positions[i].regime === 'cross') {
                MARGIN += positions[i].margin
            }
        }
    }
    return {
        pnl: PNL,
        margin: MARGIN,
    }
}

export const converLanguage = (language: string) => {
    switch (language) {
        case 'en': return 'English'
        case 'vn': return 'Vietnamese'
        case 'kp': return 'Korea'
        case 'jp': return 'Japan'
        case 'cn': return 'China'
        case 'th': return 'Thailand'
        case 'kh': return 'Cambodia'
        case 'la': return 'Laos'
        case 'id': return 'Indonesia'
        default: return 'English'
    }
}

export const convertTPSL = (item: IOpenOrder, t: any): IOpenOrderConver => {
    let showTPSL = false
    let amount = item.amount

    if (item.typeTrade === 'Limit' && (item.TP || item.SL)) {
        showTPSL = true
    } else if ((item.typeTrade === 'Take Profit Market' || item.typeTrade === 'Stop Market') && !item.amount) {
        showTPSL = false
        amount = 'Close Position'
    } else if (item.idPosition === 0 && (item.typeTrade === 'Take Profit Market' || item.typeTrade === 'Stop Market')) {
        showTPSL = true
    }

    const reducerOnly = calcReducerOnly(item.typeTrade)

    let triggerConditionsTP = null
    if (item.TP) {
        if (item.side === 'sell') {
            triggerConditionsTP = `${t(item.triggerTP + ' Price')}≥`
        } else {
            triggerConditionsTP = `${t(item.triggerTP + ' Price')}≤`
        }
    }

    let triggerConditionsSL = null
    if (item.SL) {
        if (item.side === 'sell') {
            triggerConditionsSL = `${t(item.triggerSL + ' Price')}≤`
        } else {
            triggerConditionsSL = `${t(item.triggerSL + ' Price')}≥`
        }
    }

    return {
        ...item,
        amount,
        showTPSL,
        reducerOnly,
        triggerConditionsTP,
        triggerConditionsSL,
    }
}

export const converPostirionsClose = (position: IPositionHistory, balance: number) => {
    let [PNL, ROE, RISK, SIZE, MARK_PRICE, LIQ_PRICE, ROUND] = [0, 0, 0, 0, 0, 0, 1]

    const close = position.closePrice

    PNL = calcPNL(position, close)

    MARK_PRICE = close
    ROE = calcROE(PNL, position)
    SIZE = position.margin * position.core
    ROUND = close < 10 ? 4 : (close > 9 && close < 51) ? 3 : 1

    if (position.regime === 'isolated' && position.liquidationPrice !== 0) {
        RISK = (SIZE * close * (1 / position.core)) / position.liquidationPrice
        RISK = RISK / 1000
        if (ROE < 0) {
            RISK = RISK + ROE
        } else {
            RISK = RISK - ROE
        }
        if (RISK > 64) RISK = 64
    }

    if (position.regime === 'cross' && position.side === 'sell') {
        LIQ_PRICE = balance / (position.margin * position.core) * position.entryPrice
    } else {
        LIQ_PRICE = position.liquidationPrice
    }

    return {
        ...position,
        PNL,
        ROE,
        RISK,
        SIZE,
        MARK_PRICE,
        LIQ_PRICE,
        ROUND,
    }
}

export const calcPNL = (position: IPositions | IPositionHistory, close: number) => {
    let PNL = 0
    if (position.side === 'buy') {
        PNL = (close - position.entryPrice) * position.amountCoin * position.core
    } else {
        PNL = (position.entryPrice - close) * position.amountCoin * position.core
    }
    return PNL
}

export const calcROE = (PNL: number, position: IPositions | IPositionHistory,) => {
    let ROE = 0
    ROE = PNL / position.margin * 100
    return ROE
}

export const calcReducerOnly = (typeTrade: string) => {
    if (typeTrade === 'Limit') {
        return true
    } else if (typeTrade === 'Take Profit Market' || typeTrade === 'Stop Market') {
        return true
    }
    return false
}