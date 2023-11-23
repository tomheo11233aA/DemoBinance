import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { coinChoosedSpotSelector, coinsSpotSelector } from '@selector/spotSelector'
import { setCoins } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, TouchableOpacity } from 'react-native'
import io from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import Symbol from './Symbol'

const SIZE_ICON = 15

export type StackParams = {
    HomeStack: any
}

const Header = ({ drawerRef }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>()

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', (coins: ICoins[]) => {
            dispatch(setCoins(coins))
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

    let coin: ICoins | null = null
    let percentChange: string = ''
    let colorPercentChange: string = colors.red2

    for (let index = 0; index < coins.length; index++) {
        if (coins[index].symbol === coinChoosed.symbol) {
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
                            tintColor={theme.black}
                            resizeMode={'contain'}
                            marginTop={3}
                        />
                    </TouchableOpacity>

                    <Box marginHorizontal={5}>
                        <Txt bold size={18} fontFamily={fonts.AS} color={theme.black}>
                            {coinChoosed?.currency + '/USDT'}
                        </Txt>
                    </Box>
                    <Txt
                        color={colorPercentChange}
                        fontFamily={'Myfont20-Regular'}
                        marginTop={8}
                        size={15}
                    >
                        {percentChange}
                    </Txt>
                </Box>

                <Box row marginTop={12} paddingRight={10}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
                        <Icon
                            source={require('@images/future/candles.png')}
                            size={SIZE_ICON}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                    <Icon
                        source={require('@images/trade/robot.png')}
                        size={SIZE_ICON}
                        resizeMode={'contain'}
                        marginHorizontal={13}
                    />
                    <Icon
                        source={require('@images/login/dots.png')}
                        size={SIZE_ICON}
                        resizeMode={'contain'}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Header