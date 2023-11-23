import Box from '@commom/Box'
import { useAppDispatch, useTheme } from '@hooks/index'
import { useNavigation } from '@react-navigation/native'
import { getListCoin } from '@service/tradeService'
import tradeSlice from '@slice/tradeSlice'
import contants from '@util/contants'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Coin } from 'src/model/tradeModel'
import CoinItem from './CoinItem'
import { screen } from '@util/screens'
import { setCoinChoosed } from '@slice/spotSlice'

const Coins = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const [coinData, setCoinData] = useState([])

    useEffect((): any => {
        handleGetListCoin()

        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', data => {
            if (data) {
                dispatch(tradeSlice.actions.setBestAsk(data[0].bestAsk))
                setCoinData(data)
            }
        })

        const blur = navigation.addListener('blur', () => {
            newSocket.disconnect()
        })

        const focus = navigation.addListener('focus', () => {
            newSocket.connect()
        })

        return () => {
            newSocket.disconnect()
            blur
            focus
        }
    }, [])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            setCoinData(res.data)
        }
    }

    const handleMoveTrade = (coin: Coin) => {
        dispatch(setCoinChoosed(coin))
        navigation.navigate(screen.TRADE)
    }

    return (
        <Box>
            {coinData.map((coin: Coin) =>
                <CoinItem
                    key={coin.id}
                    coin={coin}
                    theme={theme}
                    onMoveTrade={handleMoveTrade}
                />
            )}
        </Box>
    )
}

export default Coins