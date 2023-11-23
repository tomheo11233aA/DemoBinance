import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Safe from '@reuse/Safe'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import WeekDayTeller from './WeekDayTeller'
import { useTranslation } from 'react-i18next'
import HotTraders from './HotTraders'
import { getListUserTraderThunk } from '@asyncThunk/copyTradeAsyncThunk'
import { listUserTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import Box from '@commom/Box'
import LoadingYellow from '@reuse/LoadingYellow'
import { checkTrader } from '@service/copyTradeService'

const HotTeller = () => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const { t } = useTranslation()

    const listUserTrade = useAppSelector(listUserTraderCopyTradeSelector)

    const [checkHotTrader, setCheckHotTrader] = useState(false)

    useEffect(() => {
        handleGetListUserTrader()
        handleCheckTrader()
    }, [])

    const handleCheckTrader = async () => {
        setCheckHotTrader(false)
        const res = await checkTrader()
        setCheckHotTrader(res.status)
    }

    const handleGetListUserTrader = async () => {
        dispatch(getListUserTraderThunk({
            limit: 1000,
            page: 1
        }))
    }

    const handleRefresh = async () => {
        handleGetListUserTrader()
        handleCheckTrader()
    }

    return (
        <>
            {listUserTrade.loading ?
                <Box flex={1} backgroundColor={theme.bg} alignCenter justifyCenter>
                    <LoadingYellow />
                </Box>
                :
                <Safe paddingHorizontal={15}>
                    <Header {...{ theme, t }} />
                    {!checkHotTrader ? <WeekDayTeller {...{ theme, t }} /> : <></>}
                    <HotTraders {...{ theme, t, listUserTrade, handleRefresh }} />
                </Safe>
            }
        </>
    )
}

export default HotTeller