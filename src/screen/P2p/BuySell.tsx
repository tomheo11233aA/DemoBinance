import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import React from 'react'
import BuySellTab from './BuySellTab'
import Coins from './Coins'
import Funding from './Funding'
import ListBuy from './ListBuy'

const RADIUS = 20

const BuySell = () => {
    const theme = useTheme()
    return (
        <Box
            flex={1}
            paddingVertical={20}
            paddingHorizontal={15}
            backgroundColor={theme.bg}
            borderTopLeftRadius={RADIUS}
            borderTopRightRadius={RADIUS}
        >
            <BuySellTab />
            <Coins />
            <Funding />
            <ListBuy />
        </Box>
    )
}

export default BuySell