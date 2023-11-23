import Box from '@commom/Box'
import { useAppSelector, useTheme } from '@hooks/index'
import { convertToValueSpot } from '@method/format'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { walletSpotSelector } from '@selector/spotSelector'
import React from 'react'
import Balance from './Balance'
import Coins from './Coins'
import Convert from './Convert'
import { profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'

const Spot = () => {
    const theme = useTheme()
    const wallet = useAppSelector(walletSpotSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    
    const spot = convertToValueSpot(coins, wallet, profile)

    return (
        <Box>
            <Balance {...{spot}} />
            <Box height={5} backgroundColor={theme.gray} marginTop={20} />
            <Coins data={spot.coins} />
        </Box>
    )
}

export default Spot