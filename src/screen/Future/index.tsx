import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { calcPositions } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { useNavigation } from '@react-navigation/native'
import { coinsFuturesChartSelector, positionsFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { getListCoin } from '@service/tradeService'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { io } from 'socket.io-client'
import { ICoins } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'
import Balance from './Balance'
import Fee from './Fee'
import History from './History'
import Statistical from './Statistical'
import { useTranslation } from 'react-i18next'

const size_text_button = 13

const Future = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const navigation = useNavigation<any>()

    useEffect(() => {
        handleGetListCoin()
    }, [])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            dispatch(futuresSlice.actions.setCoins(res.data))
        }
    }

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

    let totalPNL: number = 0
    let balance: number = profile.balance
    let wallet_balance: number = profile.balance

    const positionObj = calcPositions(positions, coins)

    balance = profile.balance + positionObj.pnl + positionObj.margin
    wallet_balance = profile.balance + positionObj.margin
    totalPNL = positionObj.pnl

    return (
        <Box>
            <Balance {...{ balance, t }} />
            <Statistical {...{ totalPNL, balance, wallet_balance, t }} />
            <Box
                row
                marginTop={15}
                paddingHorizontal={15}
            >
                <Btn
                    onPress={() => navigate(screen.TRADE)}
                    style={[styles.button, { backgroundColor: theme.gray8 }]}
                >
                    <Txt fontFamily={fonts.IBMPM} size={size_text_button} color={theme.black}>
                        {t('Trade')}
                    </Txt>
                </Btn>
                <Btn
                    marginHorizontal={10}
                    onPress={() => navigate(screen.CONVERT)}
                    style={[styles.button, { backgroundColor: theme.gray8 }]}
                >
                    <Txt fontFamily={fonts.IBMPM} size={size_text_button} color={theme.black}>
                        {t('Convert')}
                    </Txt>
                </Btn>
                <Btn
                    onPress={() => navigate(screen.TRANSFER)}
                    style={[styles.button, { backgroundColor: theme.gray8 }]}
                >
                    <Txt fontFamily={fonts.IBMPM} size={size_text_button} color={theme.black}>
                        {t('Transfer')}
                    </Txt>
                </Btn>
            </Box>
            <Box height={5} backgroundColor={theme.gray2} marginTop={15} />
            {/* <Fee /> */}
            <History />
        </Box>
    )
}

export default Future

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: colors.gray6,
        height: 28,
        borderRadius: 4,
    },
})

// import { View, Text } from 'react-native'
// import React from 'react'
// import ComingSoon from '@screen/ComingSoon'

// const Future = () => {
//     return (
//         <ComingSoon showBack={false} />
//     )
// }

// export default Future