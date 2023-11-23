import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { styles } from '@navigation/Container'
import { navigate } from '@navigation/navigationRef'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { coinsFuturesChartSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AppState, AppStateStatus, Platform, TouchableOpacity } from 'react-native'
import io from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import Symbol from './Symbol'

const SIZE_ICON = 15

export type StackParams = {
    Trade: any;
}

const Header = ({ drawerRef }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', (coins: ICoins[]) => {
            dispatch(futuresSlice.actions.setCoins(coins))
        })

        newSocket.on(`${symbol}SELL`, (data) => {
            dispatch(futuresSlice.actions.setSells(data))
        })

        newSocket.on(`${symbol}BUY`, (data) => {
            dispatch(futuresSlice.actions.setBuys(data))
        })

        // const focus = navigation.addListener('focus', () => {
        //     newSocket.connect()
        // })

        const blur = navigation.addListener('blur', () => {
            newSocket.disconnect()
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
            // if (nextAppState === 'active') {
            //     newSocket.connect()
            // }
        });

        return () => {
            newSocket.disconnect()
            blur
            // focus
        }
    }, [])

    let coin: ICoins | null = null
    let percentChange: string = ''
    let colorPercentChange: string = colors.red2

    for (let index = 0; index < coins.length; index++) {
        if (coins[index].symbol === symbol) {
            coin = coins[index]
            break
        }
    }

    if (coin) {
        if (coin.percentChange && coin.percentChange >= 0) {
            percentChange = `+${coin.percentChange?.toFixed(2)}%`
            colorPercentChange = colors.green2
        } else {
            percentChange = `${coin?.percentChange?.toFixed(2)}%`
        }
    }

    return (
        <Box
            paddingHorizontal={15}
            marginTop={Platform.OS === 'android' ? 10 : 0}
        >
            <Symbol t={t} theme={theme} />
            <Box
                row
                justifySpaceBetween
            >
                <Box row marginVertical={10}>
                    <TouchableOpacity onPress={() => drawerRef.current.slide()}>
                        <Img
                            source={require('@images/future/convert.png')}
                            width={18}
                            height={18}
                            marginTop={3}
                            resizeMode={'contain'}
                            tintColor={theme.black}
                        />
                    </TouchableOpacity>

                    <Box marginHorizontal={5}>
                        <Txt bold size={18} fontFamily={fonts.AS} color={theme.black}>
                            {symbol}
                        </Txt>
                        <Txt size={12} color={theme.black}>
                            {t('Perpetual')}
                        </Txt>
                    </Box>
                    <Txt
                        size={15}
                        marginTop={8}
                        color={colorPercentChange}
                        fontFamily={'Myfont20-Regular'}
                    >
                        {percentChange}
                    </Txt>
                </Box>

                <Box row marginTop={12} paddingRight={10}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
                            navigate(screen.TRADE)
                        }}
                    >
                        <Icon
                            source={require('@images/future/candles.png')}
                            size={SIZE_ICON}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                    <Icon
                        size={SIZE_ICON}
                        marginHorizontal={13}
                        resizeMode={'contain'}
                        source={require('@images/future/calc.png')}
                    />
                    <Icon
                        size={SIZE_ICON}
                        resizeMode={'contain'}
                        source={require('@images/login/dots.png')}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Header