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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { themeUserSelector } from '@selector/userSelector'
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";

const ArrowDownIcon = () => {
    const themeUser = useAppSelector(themeUserSelector)
    return (
        <Icon
            source={require('@images/myHome/down-arrow.png')}
            size={10}
            resizeMode={'contain'}
            marginRight={2}
            tintColor={themeUser === 'dark' ? colors.white : colors.black}
        />
    )
}

const ArrowUpIcon = () => {
    const themeUser = useAppSelector(themeUserSelector)
    return (
        <Icon
            source={require('@images/myHome/down-arrow.png')}
            style={{ transform: [{ rotate: '180deg' }] }}
            size={10}
            resizeMode={'contain'}
            marginRight={2}
            tintColor={themeUser === 'dark' ? colors.white : colors.black}
        />
    )
}

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
    const [coinBalance, setCoinBalance] = useState(0)
    const [items, setItems] = useState([
        { label: '(BTC)', value: 'btc' },
        { label: '(ETH)', value: 'eth' },
        { label: '(BNB)', value: 'bnb' },
        { label: '(USDT)', value: 'usdt' },
        { label: '(USD)', value: 'usd' },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('usdt');
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

    useEffect(() => {
        const selectCoin = spot.coins.find((coin: any) => coin.currency === value.toUpperCase())
        if (selectCoin) {
            setCoinBalance(selectCoin.close)
        }
    }, [value, spot])
    const balance1 = BALANCE / coinBalance



    return (
        <Box
            row
            alignCenter
            marginTop={25}
            marginBottom={-5}
            justifySpaceBetween
        >
            <Box flex={1}>
                <Box row alignCenter>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.BNPL}
                        fontType={'normal'}
                        size={14}
                    >
                        {t('Total Balance')}
                        {/* {' (USDT)'} */}
                    </Txt>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{
                            borderWidth: 0,
                            width: wp('22%'),
                            zIndex: 1,
                            backgroundColor: 'transparent',
                        }}
                        dropDownContainerStyle={{
                            width: wp('30%'),
                            borderWidth: 0,
                            backgroundColor: '#f5f5f5',
                            zIndex: 1,
                        }}
                        textStyle={{
                            fontFamily: fonts.BNPL,
                            fontSize: 14,
                            color: colors.grayBlue2,
                            fontWeight: '500',
                            alignSelf: 'center',
                        }}
                        ArrowDownIconComponent={ArrowDownIcon}
                        ArrowUpIconComponent={ArrowUpIcon}
                        selectedItemLabelStyle={{ color: colors.black }}
                        labelStyle={{
                            fontFamily: fonts.BNPL,
                            fontSize: 14,
                            color: theme.black,
                        }}
                        listMode='SCROLLVIEW'
                        showTickIcon={false}
                    ></DropDownPicker>
                </Box>

                {!hide ?
                    <>
                        <Box row alignCenter marginBottom={7} zIndex={-1}>
                            <Txt
                                // fontFamily={fonts.M24}
                                // size={25}
                                // color={theme.black}
                                size={32}
                                fontFamily={fonts.BNPM}
                                fontType={'600'}
                                color={theme.black}
                            >
                                {/* {numberCommasDot(BALANCE?.toFixed(2))} */}
                                {/* {BALANCE.toLocaleString('en-US', { maximumFractionDigits: 2 })} */}
                                {value === 'usdt' || value === 'usd' ? BALANCE.toLocaleString('en-US', { maximumFractionDigits: 2 })
                                    : balance1.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            </Txt>
                            {/* <Btn
                                onPress={() => setHide(true)}
                            >
                                <Icon
                                    // size={20}
                                    size={hp(1.6)}
                                    marginLeft={5}
                                    source={require('@images/wallet/eye-open.png')}
                                />
                            </Btn> */}
                        </Box>

                        <Box row alignCenter zIndex={-1}>
                            <Txt
                                fontFamily={fonts.BNPM}
                                color={colors.grayBlue2}
                                size={16}
                                style={{ zIndex: -1 }}
                            >
                                ≈ {BALANCE.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                <Txt color={colors.grayBlue2} size={16} fontFamily={fonts.BNPM}>{' $'}</Txt>
                            </Txt>
                        </Box>
                    </> :
                    <>
                        <Box row alignStart marginVertical={7} zIndex={-1}>
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
