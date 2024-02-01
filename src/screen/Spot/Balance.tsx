import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { ISpot, calcPNL, calcROE, numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector, showBalanceSelector } from '@selector/userSelector'
import { getPosition } from '@service/futureService'
import { getListCoin } from '@service/tradeService'
import tradeSlice from '@slice/tradeSlice'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { io } from 'socket.io-client'
import { ICoins, IPositions } from 'src/model/futuresModel'
import { Coin } from 'src/model/tradeModel'
import { Profile } from 'src/model/userModel'
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { themeUserSelector } from '@selector/userSelector'

interface Props {
    spot: ISpot;
}

const ArrowDownIcon = () => {
    const themeUser = useAppSelector(themeUserSelector)
    return (
        <Icon
            source={require('@images/wallet/arrow-down.png')}
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
            source={require('@images/wallet/arrow-up.png')}
            size={10}
            resizeMode={'contain'}
            marginRight={2}
            tintColor={themeUser === 'dark' ? colors.white : colors.black}
        />
    )
}

const Balance = ({ spot }: Props) => {
    const theme = useTheme()
    const showBalance = useAppSelector(showBalanceSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const [coins, setCoins] = useState<Coin[]>([])
    const [position, setPosition] = useState<IPositions[] | null>()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('usdt');
    const [items, setItems] = useState([
        { label: 'BTC', value: 'btc' },
        { label: 'ETH', value: 'eth' },
        { label: 'BNB', value: 'bnb' },
        { label: 'USDT', value: 'usdt' },
        { label: 'USD', value: 'usd' },
    ]);


    useEffect(() => {
        handleGetPosition()
        handleGetListCoin()
    }, [profile])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            setCoins(res.data)
        }
    }

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', data => {
            setCoins(data)
        })

        return () => newSocket.disconnect()
    }, [])

    const handleGetPosition = async () => {
        const res = await getPosition(symbol)
        if (res.status) {
            setPosition(res.data)
            dispatch(tradeSlice.actions.setPositions(1))
        } else {
            setPosition(null)
            dispatch(tradeSlice.actions.setPositions(0))
        }
    }

    let PNL: number = 0
    let ROE: number = 0
    if (coins.length > 0) {
        if (position) {
            let index = coins.findIndex((coin: ICoins) => coin.symbol === position[0].symbol)
            const close = coins[index]?.close || 0
            PNL = calcPNL(position[0], close)
            ROE = calcROE(PNL, position[0])
        }
    }

    const color = PNL >= 0 ? colors.green2 : colors.red3

    const selectedCoin = spot.coins.find((coin: any) => coin.currency.toLowerCase() === value)
    const displayBalance = value === 'usd' ? spot.coins.find((coin: any) => coin.currency.toLowerCase() === 'usdt')?.balance : selectedCoin?.balance || 0
    const displayExchangeRate = value === 'usd' ? spot.coins.find((coin: any) => coin.currency.toLowerCase() === 'usdt')?.exchangeRate : selectedCoin?.exchangeRate || 0

    return (
        <Box
            paddingHorizontal={20}
        >
            <Box row alignCenter justifySpaceBetween>
                <Box row alignCenter>
                    <Txt fontType={'normal'} fontFamily={fonts.BNPL} size={14} color={theme.black}>
                        {t('Total Balance') + ' '}
                    </Txt>
                    <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                        <Icon
                            source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                            size={16}
                        />
                    </Btn>
                </Box>

                <Icon
                    source={require('@images/future/page-oclock.png')}
                    size={18}
                    resizeMode={'contain'}
                />
            </Box>

            {showBalance ?
                <>
                    <Box
                        row
                        marginTop={5}
                    >
                        <Txt
                            size={32}
                            fontFamily={fonts.BNPM}
                            fontType={'600'}
                            color={theme.black}
                        >
                            {displayBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
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
                                width: wp('20%'),
                                zIndex: 1,
                                backgroundColor: 'transparent',
                                marginTop: 5,
                            }}
                            dropDownContainerStyle={{
                                width: wp('30%'),
                                borderWidth: 0,
                                backgroundColor: '#f5f5f5',
                                zIndex: 1,
                            }}
                            textStyle={{
                                fontFamily: fonts.BNPM,
                                fontSize: 14,
                                color: 'gray',
                                alignSelf: 'center',
                            }}
                            ArrowDownIconComponent={ArrowDownIcon}
                            ArrowUpIconComponent={ArrowUpIcon}
                            selectedItemLabelStyle={{ color: colors.black }}
                            labelStyle={{ color: theme.black }}
                            showTickIcon={false}
                        />
                    </Box>
                    <Txt
                        fontFamily={fonts.BNPM}
                        color={colors.gray77}
                        size={16}
                        style={{ zIndex: -1 }}
                    >
                        {/* ≈ {numberCommasDot(spot.totalExchangeRate.toFixed(2))} */}
                        ≈ {numberCommasDot(displayExchangeRate.toFixed(2))}
                        <Txt color={colors.gray5} size={14} fontFamily={fonts.IBMPR}>{' $'}</Txt>
                    </Txt>
                </>
                :
                <>
                    <Txt size={30} marginTop={10} color={theme.white}>******</Txt>
                    <Txt fontFamily={fonts.AS} color={colors.gray5}>******</Txt>
                </>
            }

            <Box
                row
                marginTop={20}
                alignCenter
                zIndex={-1}
            >
                <Txt color={colors.gray5} fontFamily={fonts.BNPL} size={12}>{t("Today's PNL")}</Txt>
                <Icon
                    size={11}
                    marginLeft={10}
                    source={require('@images/future/info.png')}
                />
            </Box>

            <Box row alignCenter marginTop={5}>
                <Txt fontFamily={fonts.BNPL} size={14} color={color}>
                    {PNL >= 0 ?
                        `+${numberCommasDot(PNL.toFixed(2))}` :
                        `${numberCommasDot(PNL.toFixed(2))}`
                    }
                    <Txt color={color} bold size={11} fontFamily={fonts.AS}>
                        {' $/'}
                        <Txt fontFamily={fonts.BNPL} size={14} color={color}>
                            {PNL >= 0 ?
                                `+${numberCommasDot(ROE.toFixed(2))}` :
                                `${numberCommasDot(ROE.toFixed(2))}`
                            }
                        </Txt>
                    </Txt>
                </Txt>
                <View style={{ transform: [{ rotateZ: '180deg' }], marginLeft: 5 }}>
                    <Icon
                        source={require('@images/back.png')}
                        size={8}
                    />
                </View>
            </Box>

            <Box row marginTop={15}>
                <Btn
                    // onPress={() => navigate(screen.COIN_LIST)}
                    onPress={() => navigate(screen.SPOT_COIN, {
                        coin: {
                            currency: 'USDT',
                            balance: profile.balance,
                            exchangeRate: profile.balance,
                            id: 18092002,
                            wallet: 'USDT'
                        }
                    })}
                    backgroundColor={colors.yellow}
                    style={styles.button}
                >
                    <Txt fontFamily={fonts.BNPSB} size={14} fontType={'500'}>{t('Deposit')}</Txt>
                </Btn>
                <Btn
                    // onPress={() => navigate(screen.COIN_LIST_WITHDRAW)}
                    onPress={() => navigate(screen.SPOT_COIN, {
                        coin: {
                            currency: 'USDT',
                            balance: profile.balance,
                            exchangeRate: profile.balance,
                            id: 18092002,
                            wallet: 'USDT'
                        }
                    })}
                    style={styles.button}
                    backgroundColor={theme.gray2}
                    marginHorizontal={10}
                >
                    <Txt fontFamily={fonts.BNPSB} fontType={'500'} size={14} color={theme.black}>{t('Withdraw')}</Txt>
                </Btn>
                <Btn
                    onPress={() => navigate(screen.COMMING_SOON)}
                    style={styles.button}
                    backgroundColor={theme.gray2}
                >
                    <Txt fontFamily={fonts.BNPSB} fontType={'500'} size={14} color={theme.black}>{t('Transfer')}</Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default Balance

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 3,
        height: 28,
    }
})