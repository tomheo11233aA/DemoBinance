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
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'
import Button from './Button'
import Portfolio from './Portfolio'
import ComingSoon from '@screen/ComingSoon'

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

    return (
        <Box backgroundColor={theme.bg}>
            <Box paddingHorizontal={20}>
                <Box row alignCenter justifySpaceBetween>
                    <Box row alignCenter>
                        <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                            {t('Total Balance')} {'(BTC) '}
                        </Txt>
                        <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                            <Icon
                                source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                                size={20}
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
                        <Txt size={28} fontFamily={'Myfont24-Regular'} marginTop={5} color={theme.black}>
                            {numberCommasDot(COIN_PRICE.toFixed(8))}
                        </Txt>
                        <Txt fontFamily={'Myfont23-Regular'} color={colors.gray5} marginTop={10} size={17}>
                            ≈ {numberCommasDot(BALANCE.toFixed(2))}
                            <Txt color={colors.gray5} size={14} fontFamily={fonts.IBMPR}>{' $'}</Txt>
                        </Txt>
                    </>
                    :
                    <>
                        <Txt size={30} marginTop={10} color={theme.white}>******</Txt>
                        <Txt fontFamily={fonts.AS} color={colors.gray5}>******</Txt>
                    </>
                }
                <Button t={t}/>
            </Box>
            <Portfolio {...{ COIN_PRICE, BALANCE, t }} />
        </Box>
    )
}

export default Overview