import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { USDTFuturesSelector, coinsFuturesChartSelector, coreFuturesSelector, feeFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Profile } from 'src/model/userModel'
import Amount from './Amount'
import Slider from './Slider'
import { getValueConfig } from '@service/userService'
import futuresSlice from '@slice/futuresSlice'

const AmountSlider = () => {
    const dispatch = useAppDispatch()
    const hint = useSharedValue(true)
    const enter = useSharedValue(false)
    const positionX = useSharedValue(0)
    const textSize = useSharedValue(15)
    const textFont = useSharedValue(fonts.RM)
    const USDT = useAppSelector(USDTFuturesSelector)
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const fee = useAppSelector(feeFuturesSelector)

    const core = useAppSelector(coreFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        handleGetValueConfig()
    }, [])

    const handleGetValueConfig = async () => {
        let data = [0, 0]
        const resStart = await getValueConfig('FEEFUTURESTART')
        const resClose = await getValueConfig('FEEFUTURECLOSE')
        data[0] = resStart?.data[0]?.value || 0
        data[1] = resClose?.data[0]?.value || 0
        dispatch(futuresSlice.actions.setFee(data))
    }

    const exchangeRate = coins.filter(item => item.symbol == symbol)[0]?.close || 0
    let BALANCE = profile.balance

    const size = BALANCE * core
    const feeStart = size * (fee[0] / 100)
    const feeEnd = size * (fee[1] / 100)
    BALANCE = BALANCE - feeStart - feeEnd
    const max = USDT ? BALANCE * core : BALANCE * core / exchangeRate

    return (
        <Box>
            <Amount
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
            <Slider
                {...{
                    max,
                    hint,
                    enter,
                    textSize,
                    textFont,
                    positionX,
                }}
            />
        </Box>
    )
}

export default AmountSlider