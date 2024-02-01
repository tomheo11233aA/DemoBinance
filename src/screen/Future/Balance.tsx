import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import Input from '@commom/Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { showBalanceSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { Profile } from 'src/model/userModel'
import { profileUserSelector } from '@selector/userSelector'
import { convertToValueSpot } from '@method/format'
import { walletSpotSelector } from '@selector/spotSelector'
import { getCoinsFromSocket } from '@hooks/index'
import { calcPNL, calcROE } from '@method/format'
import { positionsFuturesSelector } from '@selector/futuresSelector'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { themeUserSelector } from '@selector/userSelector'
import { Modal, Portal, Provider } from 'react-native-paper'

interface Props {
    t: any;
    balance: number;
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

const formatText = (text: string) => {
    if (text.length > 10) {
        return text.slice(0, 10) + '...'
    }
    return text
}

const Balance = ({ balance, t }: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [winingDay, setWiningDay] = useState(0)
    const showBalance = useAppSelector(showBalanceSelector)
    const wallet = useAppSelector(walletSpotSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('usdt');
    const spot = convertToValueSpot(coins, wallet, profile)
    const [coinBalance, setCoinBalance] = useState(0)
    const [items, setItems] = useState([
        { label: 'BTC', value: 'btc' },
        { label: 'ETH', value: 'eth' },
        { label: 'BNB', value: 'bnb' },
        { label: 'USDT', value: 'usdt' },
        { label: 'USD', value: 'usd' },
    ]);
    useEffect(() => {
        const date = new Date()
        setWiningDay(date.getDate())
    }, [])
    useEffect(() => {
        const selectCoin = spot.coins.find((coin: any) => coin.currency === value.toUpperCase())
        if (selectCoin) {
            setCoinBalance(selectCoin.close)
        }
    }, [value, spot])

    // const balance1 = profile.balance / coinBalance
    const balance1 = balance / coinBalance
    const positions = useAppSelector(positionsFuturesSelector)
    getCoinsFromSocket()
    let totalROE = 0
    let totalPNL = 0
    positions.map((position) => {
        const index = coins.findIndex(coin => coin.symbol == position.symbol)
        const close = coins[index]?.close || 0
        const PNL = calcPNL(position, close)
        let ROE = calcROE(PNL, position)
        totalROE += ROE
        totalPNL += PNL
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempTotalPNL, setTempTotalPNL] = useState('');
    const [editableTotalPNL, setEditableTotalPNL] = useState('');
    const [tempPercent, setTempPercent] = useState('');
    const [editablePercent, setEditablePercent] = useState('');

    useEffect(() => {
        const fetchTotalPNL = async () => {
            const totalPNL = await AsyncStorage.getItem('totalPNL');
            const totalPercent = await AsyncStorage.getItem('totalPercent');
            if (totalPNL !== null) {
                setEditableTotalPNL(totalPNL);
                setTempTotalPNL(totalPNL);
            }
            if (totalPercent !== null) {
                setEditablePercent(totalPercent);
                setTempPercent(totalPercent);
            }
        };
        fetchTotalPNL();
    }, []);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    const handleSave = async () => {
        await AsyncStorage.setItem('totalPNL', tempTotalPNL);
        await AsyncStorage.setItem('totalPercent', tempPercent);
        setEditablePercent(tempPercent);
        setEditableTotalPNL(tempTotalPNL);
        hideModal();
    };


    return (
        <Box paddingHorizontal={20}>
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
                        <Txt fontFamily={fonts.BNPR} size={15} color={theme.black}>{t('Today\'s Realized PnL')}</Txt>
                        <Input
                            radius={3}
                            padding={5}
                            marginTop={5}
                            value={tempTotalPNL}
                            onChangeText={setTempTotalPNL}
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
                        <Txt fontFamily={fonts.BNPR} size={15} color={theme.black}>{t('Today\'s Realized Percent')}</Txt>
                        <Input
                            radius={3}
                            marginTop={5}
                            padding={5}
                            value={tempPercent}
                            onChangeText={setTempPercent}
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

            <Box marginBottom={15} row alignCenter justifySpaceBetween>
                <Box row alignCenter>
                    <Box
                        paddingHorizontal={10}
                        backgroundColor={theme.gray}
                        alignCenter
                        justifyCenter
                        paddingVertical={5}
                        marginRight={10}
                        radius={7}
                    >
                        <Txt fontFamily={fonts.BNPR} fontType={'500'} size={14} color={theme.black}>
                            USDⓈ-M
                        </Txt>
                    </Box>
                    <Box>
                        <Txt fontFamily={fonts.BNPR} fontType={'500'} size={14} color={colors.gray5}>COIN-M</Txt>
                    </Box>
                    <Box
                        marginLeft={10}
                    >
                        <Txt fontFamily={fonts.BNPR} fontType={'500'} size={14} color={colors.gray5}>{t('Copy Trading')}</Txt>
                    </Box>
                </Box>

                <Btn onPress={() => navigate(screen.FUTURES_HISTORY)}>
                    <Icon
                        size={18}
                        resizeMode={'contain'}
                        source={require('@images/future/page-oclock.png')}
                        tintColor={'black'}
                    />
                </Btn>
            </Box>

            <Box row alignCenter
                style={{
                    alignItems: 'center',
                }}
            >
                <View>
                    <Txt fontFamily={fonts.BNPR}
                        fontType={'400'}
                        size={16}
                        color={theme.black}
                    >
                        {t(` ${t('Margin Balance')} `)}
                    </Txt>
                    <View style={{
                        borderWidth: 0.3,
                        borderColor: theme.black,
                        borderStyle: 'dashed',
                    }} />
                </View>

                <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                    <Icon
                        marginTop={2}
                        size={16}
                        source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                    />
                </Btn>
                {/* <Box
                    row
                    radius={3}
                    alignCenter
                    padding={3}
                    backgroundColor={theme.gray}
                >
                    <Txt size={10} fontFamily={fonts.BNPM} color={theme.black}>
                        {'USDT '}
                    </Txt>
                    <Icon
                        source={require('@images/trade/more.png')}
                        size={11}
                    />
                </Box> */}
            </Box>
            {showBalance ?
                <Box marginTop={9}>
                    <View style={{
                        flexDirection: 'row',
                        // alignItems: 'flex-end'
                    }}>
                        <Txt
                            size={35}
                            fontFamily={fonts.BNPM}
                            fontType={'bold'}
                            color={theme.black}
                        >
                            ${value === 'usdt' || value === 'usd' ? balance.toLocaleString('en-US', { maximumFractionDigits: 2 })
                                : balance1.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </Txt>

                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{
                                marginTop: 2,
                                borderWidth: 0,
                                // width: '20%',
                                width: wp('20%'),
                                zIndex: 1,
                                backgroundColor: 'transparent',
                            }}
                            dropDownContainerStyle={{
                                // width: '30%',
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
                            listMode='SCROLLVIEW'
                            showTickIcon={false}
                        />


                    </View>
                    <Txt
                        fontFamily={fonts.BNPM}
                        color={colors.gray77}
                        size={15}
                        style={{ zIndex: -1 }}
                    >
                        {/* ≈ {numberCommasDot(balance.toFixed(2))} */}
                        ≈ {balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        <Txt color={colors.gray77} size={15} fontFamily={fonts.BNPM}>{' $'}</Txt>
                    </Txt>
                </Box>
                :
                <>
                    <Txt size={32} marginTop={10} color={theme.white}>******</Txt>
                    <Txt fontFamily={fonts.BNPM} color={colors.gray5}>******</Txt>
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
                <Txt
                    fontFamily={fonts.BNPL}
                    fontType={'normal'}
                    size={15}
                    color={theme.black}
                >
                    {t('Today\'s Realized PnL')}
                </Txt>
                {/* <Input
                    onPress={showModal}
                    value={editableTotalPNL}
                    onChangeText={handleTotalPNLChange}
                    keyboardType={'numeric'}
                    style={{
                        // width: wp('20%'),
                        height: hp('3%'),
                        backgroundColor: theme.gray,
                        color: colors.green2,
                        fontSize: 15,
                        marginLeft: 5,
                        textAlign: 'center',
                    }}
                    font={fonts.BNPR}
                    hint={t('Write here')}
                /> */}
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
                {/* <Txt
                    fontFamily={fonts.BNPL}
                    size={15}
                    marginLeft={7}
                    color={totalPNL >= 0 ? colors.green2 : colors.myRed}
                >
                    {`${numberCommasDot(totalPNL?.toFixed(2))}`}$ 
                 </Txt> */}

                {/* <Txt
                    fontFamily={fonts.BNPL}
                    size={14}
                    color={totalPNL >= 0 ? colors.green2 : colors.myRed}
                >
                    {`(${numberCommasDot(totalROE?.toFixed(2))}%)`}
                </Txt> */}
            </Box>
            {/* 

            <Btn
                row
                alignCenter
                marginTop={15}
                alignSelf={'flex-start'}
                onPress={() => navigate(screen.PNL_ANALYSIS)}
                zIndex={-1}
            >
                <Box
                    paddingVertical={5}
                    paddingHorizontal={8}
                    backgroundColor={theme.gray9}
                >
                    <Txt size={9} color={colors.yellowBold}>
                        {t('PNL . analysis')}
                    </Txt>
                </Box>
                <Box
                    backgroundColor={theme.green3}
                    paddingHorizontal={8}
                    paddingVertical={5}
                >
                    <Txt size={9} color={colors.green2}>
                        {`${winingDay} ${t('Winning Days')} >`}
                    </Txt>
                </Box>
            </Btn> */}
        </Box>
    )
}

export default Balance