import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import { positionsFuturesSelector } from '@selector/futuresSelector'
import React, { useState } from 'react'
import Funds from './Funds'
import OpenOrders from './OpenOrders'
import SpotGrid from './SpotGrid'
import TabHistory from './TabHistory'

const History = () => {
    const [tab, setTab] = useState<'open' | 'funds' | 'spot'>('open')
    const positions = useAppSelector(positionsFuturesSelector)

    return (
        <Box marginTop={30} flex={1}>
            <TabHistory {...{ tab, setTab, positions }} />
            {tab === 'open' ?
                <OpenOrders /> : tab === 'funds' ?
                <Funds /> : <SpotGrid />
            }
        </Box>
    )
}

export default History