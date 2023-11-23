export const convertCoinkey = (coinKey: string) => {
    const charactersBeforeDot = coinKey.split('.')[0];
    return charactersBeforeDot
}