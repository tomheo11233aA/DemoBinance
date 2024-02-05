import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { calcPositions, numberCommasDot } from '@method/format'
import { useNavigation } from '@react-navigation/native'
import { coinsFuturesChartSelector, positionsFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector, showBalanceSelector } from '@selector/userSelector'
import { getListCoin } from '@service/tradeService'
import futuresSlice from '@slice/futuresSlice'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'
import Button from './Button'
import Portfolio from './Portfolio'
import ComingSoon from '@screen/ComingSoon'
import DropDownPicker from 'react-native-dropdown-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { themeUserSelector } from '@selector/userSelector'
import { walletSpotSelector } from '@selector/spotSelector'
import { convertToValueSpot } from '@method/format'
import { Modal, Portal, Provider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '@commom/Input'
import { View } from 'react-native'

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

const Overview = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const showBalance = useAppSelector(showBalanceSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const navigation = useNavigation<any>()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('btc');
    const [items, setItems] = useState([
        { label: 'BTC', value: 'btc' },
        { label: 'ETH', value: 'eth' },
        { label: 'BNB', value: 'bnb' },
        { label: 'USDT', value: 'usdt' },
        { label: 'USD', value: 'usd' },
    ]);
    const [coinBalance, setCoinBalance] = useState(0)
    const wallet = useAppSelector(walletSpotSelector)
    const spot = convertToValueSpot(coins, wallet, profile)
    useEffect(() => {
        const selectCoin = spot.coins.find((coin: any) => coin.currency === value.toUpperCase())
        if (selectCoin) {
            setCoinBalance(selectCoin.close)
        }
    }, [value, spot])
    useEffect(() => {
        handleGetListCoin()
    }, [])

    useEffect(() => {
        handleGetPosition()
    }, [profile])

    useEffect(() => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', (coins: ICoins[]) => {
            if (coins) {
                dispatch(futuresSlice.actions.setCoins(coins))
            }
        })

        const blur = navigation.addListener('blur', () => {
            newSocket.disconnect()
        })

        const focus = navigation.addListener('focus', () => {
            newSocket.connect()
        })

        return () => {
            blur
            focus
        }
    }, [])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            dispatch(futuresSlice.actions.setCoins(res.data))
        }
    }

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
    }

    let BALANCE: number = profile.balance
    let COIN_PRICE: number = 0
    if (coins.length > 0) {
        const positionsObj = calcPositions(positions, coins)
        BALANCE = profile.balance + positionsObj.pnl + positionsObj.margin

        COIN_PRICE = BALANCE / coins[0].close
    }
    const COIN_PRICE_1 = coinBalance > 0 ? BALANCE / coinBalance : 0
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempTodayPNL, setTempTodayPNL] = useState('');
    const [editableTotalPNL, setEditableTotalPNL] = useState('');
    const [tempTodayPercent, setTempTodayPercent] = useState('');
    const [editablePercent, setEditablePercent] = useState('');

    useEffect(() => {
        const fetchTotalPNL = async () => {
            const todayPNL = await AsyncStorage.getItem('todayPNL');
            const todayPNLPercent = await AsyncStorage.getItem('todayPNLPercent');
            if (todayPNL !== null) {
                setEditableTotalPNL(todayPNL);
                setTempTodayPNL(todayPNL);
            }
            if (todayPNLPercent !== null) {
                setEditablePercent(todayPNLPercent);
                setTempTodayPercent(todayPNLPercent);
            }
        };
        fetchTotalPNL();
    }, []);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    const handleSave = async () => {
        await AsyncStorage.setItem('todayPNL', tempTodayPNL);
        await AsyncStorage.setItem('todayPNLPercent', tempTodayPercent);
        setEditablePercent(tempTodayPercent);
        setEditableTotalPNL(tempTodayPNL);
        hideModal();
    };
    return (
        <Box backgroundColor={theme.bg}>
            <Portal>
                <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                    width: wp('80%'),
                    alignSelf: 'center',
                }}>
                    <Box>
                        <Txt fontFamily={fonts.BNPR} size={15} color={theme.black}>{t('Today\'s PNL')}</Txt>
                        <Input
                            radius={3}
                            padding={5}
                            marginTop={5}
                            value={tempTodayPNL}
                            onChangeText={setTempTodayPNL}
                            keyboardType={'numeric'}
                            style={{
                                height: hp('3%'),
                                backgroundColor: theme.gray,
                                color: colors.green2,
                                fontSize: 15,
                                textAlign: 'center',
                            }}
                            font={fonts.BNPR}
                            hint={t('Write here')}
                        />
                    </Box>
                    <Box
                        marginTop={10}
                    >
                        <Txt fontFamily={fonts.BNPR} size={15} color={theme.black}>{t('Today\'s PNL Percent')}</Txt>
                        <Input
                            radius={3}
                            marginTop={5}
                            padding={5}
                            // value={tempPercent}
                            value={tempTodayPercent}
                            // onChangeText={setTempPercent}
                            onChangeText={setTempTodayPercent}
                            keyboardType={'numeric'}
                            style={{
                                height: hp('3%'),
                                backgroundColor: theme.gray,
                                color: colors.green2,
                                fontSize: 15,
                                textAlign: 'center',
                            }}
                            font={fonts.BNPR}
                            hint={t('Write here')}
                        />
                    </Box>
                    <Btn
                        marginTop={10}
                        onPress={handleSave}
                    >
                        <Txt size={15} color={colors.green2}>{t('Save')}</Txt>
                    </Btn>
                </Modal>
            </Portal>
            <Box paddingHorizontal={20}>
                <Box row alignCenter justifySpaceBetween>
                    <Box row alignCenter>
                        <Txt
                            fontType={'400'}
                            fontFamily={fonts.BNPR}
                            size={16}
                            color={theme.black}
                        >
                            {t('Total Balance') + ' '}
                        </Txt>
                        <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                            <Icon
                                source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                                size={16}
                            />
                        </Btn>
                    </Box>

                    <Box
                        row
                        radius={10}
                        alignCenter
                        paddingVertical={5}
                        paddingHorizontal={10}
                        backgroundColor={theme.gray2}
                    >
                        <Icon
                            source={require('@images/future/develop.png')}
                            size={15}
                            resizeMode={'contain'}
                        />
                        <Box
                            height={15}
                            backgroundColor={colors.grayBlue}
                            width={0.5}
                            marginHorizontal={10}
                        />
                        <Icon
                            source={require('@images/future/circle.png')}
                            size={15}
                            resizeMode={'contain'}
                        />
                    </Box>
                </Box>
                {showBalance ?
                    <>
                        <Box
                            row
                            marginTop={5}
                        >
                            <Txt
                                fontType={'bold'}
                                size={35}
                                fontFamily={fonts.BNPM}
                                color={theme.black}
                            >
                                {/* {numberCommasDot(COIN_PRICE.toFixed(8))} */}
                                {value === 'usdt' || value === 'usd' ? BALANCE.toLocaleString('en-US', { maximumFractionDigits: 2 })
                                    : COIN_PRICE_1.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            </Txt>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={{
                                    marginTop: 5,
                                    borderWidth: 0,
                                    height: hp('5%'),
                                    width: wp('20%'),
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
                                    fontFamily: fonts.BNPR,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: 'gray',
                                    alignSelf: 'center',
                                }}
                                ArrowDownIconComponent={ArrowDownIcon}
                                ArrowUpIconComponent={ArrowUpIcon}
                                selectedItemLabelStyle={{ color: colors.black }}
                                labelStyle={{ color: theme.black }}
                                listMode='SCROLLVIEW'
                                showTickIcon={false}
                            />
                        </Box>
                        <Txt
                            fontFamily={fonts.BNPM}
                            color={colors.gray77}
                            size={15}
                            style={{ zIndex: -1 }}
                        >
                            ≈ {BALANCE.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            <Txt color={colors.gray5} size={15} fontFamily={fonts.BNPM}>{' $'}</Txt>
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
                    marginTop={10}
                    style={{
                        alignItems: 'center',
                    }}
                    zIndex={-1}
                >
                    <Box>
                        <Txt
                            fontFamily={fonts.BNPL}
                            fontType={'normal'}
                            size={15}
                            color={theme.black}
                        >
                            {t('Today\'s PNL')}
                        </Txt>
                        <View style={{
                            borderWidth: 0.3,
                            borderColor: theme.black,
                            borderStyle: 'dashed',
                        }} />
                    </Box>
                    <Btn onPress={showModal} row>
                        <Txt
                            fontFamily={fonts.BNPR}
                            size={15}
                            marginLeft={5}
                            color={colors.green2}
                        >
                            +{editableTotalPNL ? `${Number(editableTotalPNL).toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '0.000000'}
                        </Txt>

                        <Txt
                            fontFamily={fonts.BNPR}
                            size={15}
                            color={colors.green2}
                        >
                            {' $ '}{editablePercent ? `(+${Number(editablePercent).toLocaleString('en-US', { maximumFractionDigits: 2 })}%)` : '0,00%'}
                        </Txt>
                    </Btn>
                </Box>
                <Button t={t} />
            </Box>
            <Portfolio {...{ COIN_PRICE, BALANCE, t }} />
        </Box>
    )
}

export default Overview