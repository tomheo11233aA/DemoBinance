import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
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

interface Props {
    t: any;
    balance: number;
}

const ArrowDownIcon = () => (
    <Icon
        source={require('@images/wallet/arrow-down.png')}
        size={10}
        resizeMode={'contain'}
        marginRight={2}
    />
)

const ArrowUpIcon = () => (
    <Icon
        source={require('@images/wallet/arrow-up.png')}
        size={10}
        resizeMode={'contain'}
        marginRight={2}
    />
)

const Balance = ({ balance, t }: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [winingDay, setWiningDay] = useState(0)
    const showBalance = useAppSelector(showBalanceSelector)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('usdt');
    const [loading, setLoading] = useState(false);

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
        console.log(balance)
    }, [])

    return (
        <Box paddingHorizontal={20}>
            <Box marginBottom={15} row alignCenter justifySpaceBetween>
                <Box row alignCenter>
                    <Box
                        paddingHorizontal={6}
                        backgroundColor={theme.gray}
                        alignCenter
                        justifyCenter
                        paddingVertical={3}
                        marginRight={10}
                        radius={3}
                    >
                        <Txt fontFamily={fonts.BNPM} size={12} color={theme.black}>
                            USDⓈ-M
                        </Txt>
                    </Box>
                    <Box>
                        <Txt fontFamily={fonts.BNPM} size={12} color={colors.gray5}>COIN-M</Txt>
                    </Box>
                </Box>

                <Btn onPress={() => navigate(screen.FUTURES_HISTORY)}>
                    <Icon
                        size={18}
                        resizeMode={'contain'}
                        source={require('@images/future/page-oclock.png')}
                    />
                </Btn>
            </Box>

            <Box row alignCenter
                style={{
                    alignItems: 'center',
                }}
            >
                <View>
                    <Txt fontFamily={fonts.BNPM}
                        size={14}
                        color={theme.black}
                    >
                        {t(` ${t('Margin Balance')} `)}
                    </Txt>
                    {/* underline style dotted */}
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
                            size={32}
                            fontFamily={fonts.BNPM}
                            fontType={'600'}
                            color={theme.black}
                        >
                            {/* {numberCommasDot(balance.toFixed(2))} */}
                            {/* {balance.toLocaleString('en-US', { maximumFractionDigits: 2 })} */}
                            0,00600559
                        </Txt>
                        {
                            <DropDownPicker
                                loading={loading}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={{
                                    borderWidth: 0,
                                    width: '20%',
                                    zIndex: 1,
                                }}
                                dropDownContainerStyle={{
                                    width: '25%',
                                    borderWidth: 0,
                                    marginTop: 5,
                                    backgroundColor: '#f5f5f5',
                                    zIndex: 1,
                                }}
                                textStyle={{
                                    fontFamily: fonts.BNPM,
                                    fontSize: 13,
                                    color: 'gray',
                                    alignSelf: 'center',
                                }}
                                ArrowDownIconComponent={ArrowDownIcon}
                                ArrowUpIconComponent={ArrowUpIcon}
                                selectedItemLabelStyle={{ color: theme.black }}
                                labelStyle={{ color: theme.black }}
                                listMode='SCROLLVIEW'
                                showTickIcon={false}
                            />

                        }
                    </View>
                    <Txt fontFamily={fonts.BNPM} color={colors.gray5} size={15}>
                        {/* ≈ {numberCommasDot(balance.toFixed(2))} */}
                        ≈ {balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        {/* ≈ 240,78 */}
                        <Txt color={colors.gray5} size={15} fontFamily={fonts.BNPM}>{' $'}</Txt>
                    </Txt>
                </Box>
                :
                <>
                    <Txt size={30} marginTop={10} color={theme.white}>******</Txt>
                    <Txt fontFamily={fonts.BNPM} color={colors.gray5}>******</Txt>
                </>
            }
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
            </Btn>
        </Box>
    )
}

export default Balance