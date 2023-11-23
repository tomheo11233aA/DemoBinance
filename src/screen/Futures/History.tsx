import { getHistoryOpenOrderAllThunk } from '@asyncThunk/fundingAsyncThunk'
import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import LoadingYellow from '@reuse/LoadingYellow'
import { openOrdersFundingSelector } from '@selector/fundingSelector'
import { loadingHistoryFutureSelector, positionFuturesSelector, positionsFuturesSelector, stopProfitFuturesSelector, symbolFuturesSelector, tpslPositionFutureSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect, useState } from 'react'
import { Profile } from 'src/model/userModel'
import ModalClosePosition from './ModalClosePosition'
import ModalCorePosition from './ModalCorePosition'
import ModalStopFrofit from './ModalStopFrofit'
import ModalTPSLPosition from './ModalTPSLPosition'
import OpenOrders from './OpenOrders'
import Positions from './Positions'
import TabHistory from './TabHistory'

const History = () => {
    const dispatch = useAppDispatch()
    const [tab, setTab] = useState<'open' | 'position'>('open')

    const symbol = useAppSelector(symbolFuturesSelector)
    const position = useAppSelector(positionFuturesSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const stopProfit = useAppSelector(stopProfitFuturesSelector)
    const openOrders = useAppSelector(openOrdersFundingSelector)
    const tpslPosition = useAppSelector(tpslPositionFutureSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const loadingHistoryFuture = useAppSelector(loadingHistoryFutureSelector)

    useEffect((): any => {
        handleGetPosition()
    }, [profile])

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
        await dispatch(getHistoryOpenOrderAllThunk({
            page: 1,
            limit: 1000,
        }))
    }

    return (
        <Box marginTop={30} flex={1}>
            <TabHistory {...{ tab, setTab, positions, openOrders }} />
            {loadingHistoryFuture ?
                <LoadingYellow /> :
                <>
                    {tab === 'open' ?
                        <OpenOrders {...{ openOrders }} /> :
                        <Positions {...{ positions }} />
                    }
                </>
            }
            <ModalClosePosition
                show={position !== null}
                setShow={() => { }}
            />
            <ModalCorePosition />
            {stopProfit.showModal && <ModalStopFrofit {...{ stopProfit }} />}
            {tpslPosition.showModal && <ModalTPSLPosition {...{ tpslPosition }} />}
        </Box>
    )
}

export default History