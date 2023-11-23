import { getPositionThunk } from "@asyncThunk/futuresAsyncThunk";
import { getWalletThunk } from "@asyncThunk/spotAsyncThunk";
import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { getCoinsFromSocket, useAppDispatch, useAppSelector, useTheme } from "@hooks/index";
import { calcPositions, convertToValueSpot, numberCommasDot } from "@method/format";
import { navigate } from "@navigation/navigationRef";
import { coinsFuturesChartSelector, positionsFuturesSelector, symbolFuturesSelector } from "@selector/futuresSelector";
import { walletSpotSelector } from "@selector/spotSelector";
import { profileUserSelector } from "@selector/userSelector";
import { getListCoin } from "@service/tradeService";
import futuresSlice from "@slice/futuresSlice";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { screen } from "@util/screens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Profile } from "src/model/userModel";

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [hide, setHide] = useState(false)

    const wallet = useAppSelector(walletSpotSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        handleGetListCoin()
    }, [])

    useEffect(() => {
        handleGetPosition()
    }, [profile])

    getCoinsFromSocket()

    const handleGetListCoin = async () => {
        await dispatch(getWalletThunk())
        const res = await getListCoin()
        if (res.status) {
            dispatch(futuresSlice.actions.setCoins(res.data))
        }
    }

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
    }

    let BALANCE: number = profile.balance

    const positionObj = calcPositions(positions, coins)
    BALANCE = profile.balance + positionObj.pnl + positionObj.margin

    const spot = convertToValueSpot(coins, wallet, profile)
    BALANCE += spot.totalExchangeRate

    return (
        <Box
            row
            alignCenter
            marginTop={25}
            marginBottom={-5}
            justifySpaceBetween
        >
            <Box>
                <Box row alignCenter>
                    <Txt size={10} color={theme.black}>
                        {t('Total (USDT)')}
                    </Txt>
                    <Icon
                        size={11}
                        marginLeft={5}
                        source={require('@images/trade/more.png')}
                    />
                </Box>

                {!hide ?
                    <>
                        <Box row alignCenter marginVertical={7}>
                            <Txt fontFamily={fonts.M24} size={25} color={theme.black}>
                                {numberCommasDot(BALANCE?.toFixed(2))}
                            </Txt>
                            <Btn
                                onPress={() => setHide(true)}
                            >
                                <Icon
                                    size={20}
                                    marginLeft={5}
                                    source={require('@images/wallet/eye-open.png')}
                                />
                            </Btn>
                        </Box>

                        <Box row alignCenter>
                            <Txt size={11} color={colors.grayBlue2}>
                                {'≈ '}
                                <Txt size={15} color={colors.grayBlue2} fontFamily={fonts.M23}>
                                    {numberCommasDot(BALANCE?.toFixed(2))}
                                </Txt>
                            </Txt>
                            <Txt size={11} color={colors.grayBlue2}>
                                {' $'}
                            </Txt>
                        </Box>
                    </> :
                    <>
                        <Box row alignStart marginVertical={7}>
                            <Txt fontFamily={fonts.M24} size={25} color={theme.white}>
                                *******
                            </Txt>
                            <Btn
                                onPress={() => setHide(false)}
                            >
                                <Icon
                                    source={require('@images/wallet/eye-close.png')}
                                    size={20}
                                    marginLeft={5}
                                />
                            </Btn>
                        </Box>

                        <Txt size={11} color={colors.grayBlue2}>******</Txt>
                    </>
                }

            </Box>

            <Btn
                onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin: { currency: 'USDT' } })}
                width={80}
                radius={4}
                height={30}
                alignCenter
                justifyCenter
                backgroundColor={colors.yellow}
            >
                <Txt fontFamily={fonts.IBMPM} size={12}>{t('Deposit')}</Txt>
            </Btn>
        </Box>
    )
}
