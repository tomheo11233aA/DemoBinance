import tradeSlice from '@slice/tradeSlice'
import { db } from '@util/db'
import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { heigh_candle, paddingTop, size_chart } from './Diagram'

const Controll = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // const timeOut = setInterval(() => {
        //     addPlus()
        // }, 5000)
        // return () => clearInterval(timeOut)
    }, [])

    const add = () => {
        let arr = db
        arr[arr.length - 1].close = Math.floor(Math.random() * (95 - 55 + 1)) + 55
        handleDispatch(arr)
    }

    const addHigh = () => {
        let arr = db
        arr[arr.length - 1].high = 150
        arr[arr.length - 2].high = 120
        handleDispatch(arr)
    }

    const addLow = () => {
        let arr = db
        arr[arr.length - 1].low = 20
        handleDispatch(arr)
    }

    const addPlus = () => {
        let arr = db
        arr[arr.length - 1].time = Math.floor(Math.random() * (95 - 55 + 1)) + 55
        arr[arr.length - 1].close = 63.50
        handleDispatch(arr)
    }

    const handleDispatch = (arr: any) => {
        dispatch(tradeSlice.actions.setChart({
            arr,
            size_chart: size_chart,
            heigh_candle: heigh_candle,
            paddingTop: paddingTop,
        }))
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <Button
                title='add'
                onPress={add}
            />
            <Button
                title='addHigh'
                onPress={addHigh}
            />
            <Button
                title='addLow'
                onPress={addLow}
            />
            <Button
                title='addPlus'
                onPress={addPlus}
            />
        </View>
    )
}

export default Controll