import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import { dayChoosedCopyTradeSelector, hotTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import React from 'react'
import Details from './Details'
import Favorite from './Favorite'
import ROI from './ROI'
import RiskAssessment from './RiskAssessment'
import StatisticsTradingData from './StatisticsTradingData'
import WeeklyProfit from './WeeklyProfit'

const TabTradingData = ({ theme, t }: any) => {
    const hotTrader = useAppSelector(hotTraderCopyTradeSelector)
    const dayChoosed = useAppSelector(dayChoosedCopyTradeSelector)

    return (
        <Box>
            <StatisticsTradingData {...{ theme, t, hotTrader, dayChoosed }} />
            <ROI {...{ theme, t, hotTrader, dayChoosed }} />
            <WeeklyProfit {...{ theme, t, hotTrader, dayChoosed }} />
            {/* <RiskAssessment {...{ theme, t, dayChoosed }} />
            <Favorite {...{ theme, t, dayChoosed }} />
            <Details {...{ theme, t }} /> */}
        </Box>
    )
}

export default TabTradingData